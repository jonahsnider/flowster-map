import type {Status} from '@googlemaps/react-wrapper';
import {Wrapper} from '@googlemaps/react-wrapper';
import {isLatLngLiteral} from '@googlemaps/typescript-guards';
import {createCustomEqual} from 'fast-equals';
import type {NextPage} from 'next';
import React from 'react';
import {API_KEYS} from '../config';

const render = (status: Status) => {
	return <h1>{status}</h1>;
};

const MapPage: NextPage = () => {
	const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
	const [zoom, setZoom] = React.useState(3); // Initial zoom
	const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
		lat: 0,
		lng: 0,
	});

	const onClick = (event: google.maps.MapMouseEvent) => {
		// Avoid directly mutating state
		setClicks([...clicks, event.latLng!]);
	};

	const onIdle = (m: google.maps.Map) => {
		console.log('onIdle');
		setZoom(m.getZoom()!);
		setCenter(m.getCenter()!.toJSON());
	};

	const form = (
		<div
			style={{
				padding: '1rem',
				flexBasis: '250px',
				height: '100%',
				overflow: 'auto',
			}}
		>
			<label htmlFor='zoom'>Zoom</label>
			<input
				type='number'
				id='zoom'
				name='zoom'
				value={zoom}
				onChange={event => {
					setZoom(Number(event.target.value));
				}}
			/>
			<br />
			<label htmlFor='lat'>Latitude</label>
			<input
				type='number'
				id='lat'
				name='lat'
				value={center.lat}
				onChange={event => {
					setCenter({...center, lat: Number(event.target.value)});
				}}
			/>
			<br />
			<label htmlFor='lng'>Longitude</label>
			<input
				type='number'
				id='lng'
				name='lng'
				value={center.lng}
				onChange={event => {
					setCenter({...center, lng: Number(event.target.value)});
				}}
			/>
			<h3>{clicks.length === 0 ? 'Click on map to add markers' : 'Clicks'}</h3>
			{clicks.map(latLng => (
				<pre key={latLng.toString()}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
			))}
			<button
				type='button'
				onClick={() => {
					setClicks([]);
				}}
			>
				Clear
			</button>
		</div>
	);

	return (
		<div style={{display: 'flex', height: '100%'}}>
			<Wrapper apiKey={API_KEYS.GOOGLE_MAPS} render={render}>
				<Map center={center} zoom={zoom} style={{flexGrow: '1', height: '100%'}} onClick={onClick} onIdle={onIdle}>
					{clicks.map(latLng => (
						<Marker key={latLng.toString()} position={latLng} />
					))}
				</Map>
			</Wrapper>
			{/* Basic form for controlling center and zoom of map. */}
			{form}
		</div>
	);
};

export default MapPage;

interface MapProps extends google.maps.MapOptions {
	style: Record<string, string>;
	onClick?: (event: google.maps.MapMouseEvent) => void;
	onIdle?: (map: google.maps.Map) => void;
}

const Map: React.FC<MapProps> = ({onClick, onIdle, children, style, ...options}) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [map, setMap] = React.useState<google.maps.Map>();

	React.useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
	}, [ref, map]);

	// Because React does not do deep comparisons, a custom hook is used
	// see discussion in https://github.com/googlemaps/js-samples/issues/946
	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	React.useEffect(() => {
		if (map) {
			for (const eventName of ['click', 'idle']) google.maps.event.clearListeners(map, eventName);

			if (onClick) {
				map.addListener('click', onClick);
			}

			if (onIdle) {
				map.addListener('idle', () => {
					onIdle(map);
				});
			}
		}
	}, [map, onClick, onIdle]);

	return (
		<>
			<div ref={ref} style={style} />
			{React.Children.map(children, child => {
				if (React.isValidElement(child)) {
					// Set the map prop on the child component
					return React.cloneElement(child, {map});
				}
			})}
		</>
	);
};

const Marker: React.FC<google.maps.MarkerOptions> = options => {
	const [marker, setMarker] = React.useState<google.maps.Marker>();

	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		// Remove marker from map on unmount
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	React.useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
	}, [marker, options]);

	return null;
};

const deepCompareEqualsForMaps = createCustomEqual(deepEqual => (a: unknown, b: unknown): boolean => {
	if ((isLatLngLiteral(a) || a instanceof google.maps.LatLng) && (isLatLngLiteral(b) || b instanceof google.maps.LatLng)) {
		return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
	}

	// TODO extend to other types

	// use fast-equals for other objects
	return deepEqual(a, b);
});

function useDeepCompareMemoize(value: any): unknown {
	const ref = React.useRef();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		ref.current = value;
	}

	return ref.current;
}

function useDeepCompareEffectForMaps(callback: React.EffectCallback, dependencies: any[]) {
	// eslint-disable-next-line unicorn/no-array-callback-reference
	React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
