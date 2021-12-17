import GoogleMapReact from 'google-map-react';
import React from 'react';
import type {Models} from '../backend';
import Marker from './Marker';

export interface Props {
	users: readonly Models.User[];
}

const UserMap: React.FC<Props> = props => {
	const [center, setCenter] = React.useState({lat: 0, lng: 0});
	const [zoom, setZoom] = React.useState(0);

	const onChange = (change: GoogleMapReact.ChangeEventValue): void => {
		setCenter(change.center);
		setZoom(change.zoom);
	};

	const shouldShowLabel = zoom > 4;

	const markers = props.users.map(user => (
		<Marker
			key={user.location.latitude.toString() + user.location.longitude.toString()}
			user={user}
			shouldShowLabel={shouldShowLabel}
			lat={user.location.latitude}
			lng={user.location.longitude}
		/>
	));

	return (
		<GoogleMapReact
			draggable
			googleMapLoader={async () => google.maps}
			defaultCenter={{lat: 0, lng: 0}}
			defaultZoom={0}
			center={center}
			zoom={zoom}
			onChange={onChange}
		>
			{markers}
		</GoogleMapReact>
	);
};

export default UserMap;
