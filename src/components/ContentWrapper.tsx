import React from 'react';
import type {ContainerProps} from '@chakra-ui/react';
import {Container} from '@chakra-ui/react';

export interface Props extends ContainerProps {
	main?: boolean | undefined;
}

const ContentWrapper: React.FC<Props> = ({main, children, ...containerProps}) => {
	const Tag = main ? 'main' : React.Fragment;

	return (
		<Tag>
			<Container maxW='container.xl' my={main ? 4 : undefined} {...containerProps}>
				{children}
			</Container>
		</Tag>
	);
};

export default ContentWrapper;
