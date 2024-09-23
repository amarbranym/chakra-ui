import React from 'react';
import {
    Box,
    Container,
    Heading,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import Logo from '../../layout/Logo';

interface AuthLayoutProps {
    children: React.ReactNode;
    heading: string;
    url: string;
}

const AuthLayout = ({ children, heading, url }: AuthLayoutProps) => {

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8" mx="auto">
                <Stack spacing="6">
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'lg' }}>{heading}</Heading>
                        {
                            url === 'login' ? (
                                <Text color="fg.muted">
                                    Don&apos;t have an account? <Link href="/signup" color="blue.500">Sign up</Link>
                                </Text>
                            ) : (
                                <Text color="fg.muted">
                                    Already have an account? <Link href="/login" color="blue.500">Login</Link>
                                </Text>
                            )
                        }
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg.surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6" >
                        {children}
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default AuthLayout;
