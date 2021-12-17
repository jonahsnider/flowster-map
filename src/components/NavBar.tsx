import {CloseIcon, HamburgerIcon} from '@chakra-ui/icons';
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	HStack,
	IconButton,
	Link,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	Stack,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import AuthContext from '../contexts/AuthContext';
import {auth} from '../firebase';
import ContentWrapper from './ContentWrapper';

const NavLink: React.FC<{href: string}> = props => (
	<NextLink passHref href={props.href}>
		<Button
			as={Link}
			_hover={{
				textDecoration: 'none',
			}}
		>
			{props.children}
		</Button>
	</NextLink>
);

const Simple: React.FC = () => {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const bgColor = useColorModeValue('gray.100', 'gray.900');

	return (
		<AuthContext.Consumer>
			{user => (
				<Box bg={bgColor} px={4}>
					<ContentWrapper>
						<Flex h={16} alignItems='center' justifyContent='space-between'>
							<IconButton
								size='md'
								icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
								aria-label='Open Menu'
								display={{md: 'none'}}
								onClick={isOpen ? onClose : onOpen}
							/>
							<HStack spacing={8} alignItems='center'>
								<Box>Flowster Map</Box>
								<HStack as='nav' spacing={4} display={{base: 'none', md: 'flex'}}>
									<NavLink href='/'>Home</NavLink>
									<NavLink href='/map'>Map</NavLink>
								</HStack>
							</HStack>
							{user && (
								<Flex alignItems='center'>
									<Menu id='navbar'>
										<MenuButton as={Button}>
											<Center>
												<Avatar mr={2} name={user.displayName ?? undefined} size='xs' src={user.photoURL ?? undefined} />
												{user.displayName}
											</Center>
										</MenuButton>
										<MenuList>
											<NextLink href='/account'>
												<a>
													<MenuItem>Account</MenuItem>
												</a>
											</NextLink>
											<MenuDivider />
											<MenuItem onClick={async () => auth.signOut()}>Sign out</MenuItem>
										</MenuList>
									</Menu>
								</Flex>
							)}
						</Flex>

						{isOpen ? (
							<Box pb={4} display={{md: 'none'}}>
								<Stack as='nav' spacing={4}>
									amongussy
								</Stack>
							</Box>
						) : null}
					</ContentWrapper>
				</Box>
			)}
		</AuthContext.Consumer>
	);
};

export default Simple;
