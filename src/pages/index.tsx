import {Wrapper} from '@googlemaps/react-wrapper';
import type {NextPage} from 'next';
import React from 'react';

const Home: NextPage = () => {
	const ref = React.useRef<HTMLDivElement>(null);
	const [map, setMap] = React.useState<google.maps.Map>();

	React.useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
	}, [ref, map]);

	return (
		<Wrapper apiKey='YOUR_API_KEY'>
			{/* <Map>
				<Marker position={position} />
			</Map> */}
		</Wrapper>
	);
};

export default Home;
