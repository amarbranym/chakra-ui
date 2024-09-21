/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { Button, FormControl, FormLabel, IconButton, Input, InputGroup, InputRightElement, Stack, useDisclosure, useMergeRefs, VStack } from '@chakra-ui/react';
import { HiEye, HiEyeOff } from 'react-icons/hi'

const SignupCompnent = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState("")
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [loader, setLoader] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (confirmPassword !== formData.password) {
            alert("password not metch")
            return
        }
        setLoader(true)
        try {
            const response = await fetch('http://localhost:1337/api/auth/local/register', {
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
            console.log(responseData.jwt)
            localStorage.setItem('jwt', responseData.jwt);
        } catch (error) {
            console.error('Signup error', error);
            setLoader(false)
        }

    };
    const { isOpen: isPasswordVisible, onToggle: onTogglePasswordVisibility } = useDisclosure();
    const { isOpen: isConfirmPasswordVisible, onToggle: onToggleConfirmPasswordVisibility } = useDisclosure();
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-xl mx-auto'>
            <VStack spacing="2">
                <FormControl>
                    <FormLabel htmlFor='username'>User Name</FormLabel>
                    <Input required type="text" name="username" onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor='email'>Email</FormLabel>
                    <Input required type="email" name="email" onChange={handleChange} />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <InputGroup>
                        <InputRightElement>
                            <IconButton
                                variant="text"
                                aria-label={isPasswordVisible ? 'Mask password' : 'Reveal password'}
                                icon={isPasswordVisible ? <HiEyeOff /> : <HiEye />}
                                onClick={onTogglePasswordVisibility}
                            />
                        </InputRightElement>
                        <Input
                            id="password"
                            name="password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            onChange={handleChange}
                        />
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="confirmPassword">confirm Password</FormLabel>
                    <InputGroup>
                        <InputRightElement>
                            <IconButton
                                variant="text"
                                aria-label={isConfirmPasswordVisible ? 'Mask password' : 'Reveal password'}
                                icon={isConfirmPasswordVisible ? <HiEyeOff /> : <HiEye />}
                                onClick={onToggleConfirmPasswordVisibility}
                            />
                        </InputRightElement>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                </FormControl>
                <Stack w="full" spacing='6' py={{ base: "2" }} >
                    <Button type='submit' >Signup</Button>
                </Stack>
            </VStack>
        </form>
    );
};

export default SignupCompnent;
