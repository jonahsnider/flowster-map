import {Box, Button, FormControl, FormHelperText, FormLabel, Heading, Input, useToast} from '@chakra-ui/react';
import type {DocumentReference} from 'firebase/firestore';
import {doc, GeoPoint, setDoc} from 'firebase/firestore';
import React from 'react';
import type {Models} from '../backend';
import {auth, db} from '../firebase';

interface FormValues {
	city: string;
	lat: number;
	lng: number;
}

function randomizeCoords(geoPoint: Readonly<GeoPoint>): GeoPoint {
	const scalar = 0.5;

	return new GeoPoint(geoPoint.latitude + Math.random() * scalar, geoPoint.longitude + Math.random() * scalar);
}

const UpdateAccount: React.VFC = () => {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const toast = useToast();

	const [isLoading, setIsLoading] = React.useState(false);
	const [isDisabled, setIsDisabled] = React.useState(true);
	const [place, setPlace] = React.useState<FormValues | undefined>();

	React.useEffect(() => {
		// TODO: You could fetch the previous location and use it as the bounds to improve search results
		const searchBox = new google.maps.places.SearchBox(inputRef.current!);

		searchBox.addListener('places_changed', () => {
			const places = searchBox.getPlaces();
			const place = places?.[0];

			if (!place || !place.geometry?.location || !place.types?.includes('locality')) {
				setIsDisabled(true);
				return;
			}

			setPlace({
				city: place.formatted_address ?? place.name ?? '(Unknown)',
				lat: place.geometry.location.lat(),
				lng: place.geometry.location.lng(),
			});
			setIsDisabled(false);
		});

		return () => {
			searchBox.unbindAll();
		};
	});

	const onSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault();

		setIsLoading(true);

		try {
			if (!auth.currentUser) {
				throw new TypeError('Current user should be defined');
			}

			if (!place) {
				throw new TypeError('Place should be defined');
			}

			const {city} = place;
			const geoPoint = randomizeCoords(new GeoPoint(place.lat, place.lng));

			await setDoc<Models.User>(doc(db, 'users', auth.currentUser.uid) as DocumentReference<Models.User>, {
				city,
				location: geoPoint,
				name: auth.currentUser.displayName ?? auth.currentUser.email ?? auth.currentUser.uid,
				profilePictureUrl: auth.currentUser.photoURL,
			});

			toast({
				title: 'Info saved',
				description: `Your location was updated to ${city}`,
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box my={4}>
			<Heading size='lg' mb={2}>
				Update account
			</Heading>

			<form onSubmit={onSubmit}>
				<FormControl id='update-account' w='container.sm'>
					<FormLabel>Location</FormLabel>
					<Input ref={inputRef} type='text' />
					<FormHelperText>After submitting your location will be shuffled a bit to prevent overlapping</FormHelperText>
				</FormControl>

				<Button mt={4} colorScheme='blue' isLoading={isLoading} disabled={isDisabled} type='submit'>
					Submit
				</Button>
			</form>
		</Box>
	);
};

export default UpdateAccount;
