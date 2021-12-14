import React from 'react';

const Marker: React.FC<google.maps.MarkerOptions> = options => {
	const [marker, setMarker] = React.useState<google.maps.Marker>();

	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}

		// Remove marker from map on unmount
		return () => {
			marker?.setMap(null);
		};
	}, [marker]);

	React.useEffect(() => {
		marker?.setOptions(options);
	}, [marker, options]);

	return null;
};

export default Marker;
