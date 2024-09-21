/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Button, Checkbox, FormControl, FormLabel, HStack, IconButton, Input, InputGroup, InputRightElement, Link, Stack, useDisclosure, useMergeRefs, VStack } from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi'
const LoginComponent = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: '',
    });
    const [loader, setLoader] = useState(false)

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoader(true)
        try {
            const response = await fetch('http://localhost:1337/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error.message || 'Signup request failed');
                setLoader(false)
            }
            setLoader(false)
            const responseData = await response.json();
            localStorage.setItem('jwt', responseData.jwt);
        } catch (error) {
            console.error('Signup error', error);
            setLoader(false)
        }

    };
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }
    return (
        <form onSubmit={handleSubmit} >
            <VStack spacing="2">
                <FormControl>
                    <FormLabel htmlFor='identifier'>Email</FormLabel>
                    <Input required type="email" name="identifier" onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                        <InputRightElement>
                            <IconButton
                                variant="text"
                                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                                onClick={onClickReveal}
                            />
                        </InputRightElement>
                        <Input
                            id="password"
                            ref={mergeRef}
                            name="password"
                            type={isOpen ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <HStack w="full" justify="space-between" py={{ base: "2" }} >
                    <Checkbox defaultChecked>Remember me</Checkbox>
                    <Link href="/forgotpassword" color='blue.500' >
                        Forgot password?
                    </Link>
                </HStack>
                <Stack w="full" spacing='6' py={{ base: "2" }} >
                    <Button type='submit' >Login</Button>
                </Stack>
            </VStack>
        </form>
    );
};

export default LoginComponent;
