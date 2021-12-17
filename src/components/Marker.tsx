import {Avatar, Badge, Box, Flex, Text} from '@chakra-ui/react';
import React from 'react';
import type {Models} from '../backend';

interface Props {
	user: Models.User;
	shouldShowLabel: boolean;

	// Needed for the markers to render properly
	/* eslint-disable react/no-unused-prop-types */
	lat: number;
	lng: number;
	/* eslint-enable react/no-unused-prop-types */
}

const Marker: React.FC<Props> = props => {
	return (
		<Flex>
			<Avatar size='sm' src={props.user.profilePictureUrl ?? undefined} name={props.user.name} />
			<Box ml='3' role='group'>
				<Text fontSize='xl' fontWeight='bold' visibility={props.shouldShowLabel ? 'visible' : 'hidden'}>
					{props.user.name}
					<Badge ml='1' colorScheme='red'>
						{props.user.city}
					</Badge>
				</Text>
			</Box>
		</Flex>
	);
};

export default Marker;
