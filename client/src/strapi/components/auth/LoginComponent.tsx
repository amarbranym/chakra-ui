/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useRef, useState } from 'react';
import { Box, Button, Grid, GridItem, } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import FormFields from '../form/FormFields';
import { loginSchema, signupSchema } from '../../../config/schema/userSchema';
import * as Yup from "yup"
import toast from 'react-hot-toast';

const LoginComponent = () => {
    const [loader, setLoader] = useState(false)
    const { initialValues, validationSchemaFields } = useMemo(() => {

        const newInitialValues: { [key: string]: any } = {};
        const newValidationSchemaFields: { [key: string]: any } = {};

        loginSchema.forEach((field: any) => {
            const fieldName = field?.name;

            newInitialValues[fieldName] = '';

            let fieldValidation: any = Yup.mixed();

            switch (field?.type) {
                case 'text':
                    fieldValidation = Yup.string()
                        .min(field?.rules?.min, `${field?.label} must be at least ${field?.rules?.min}`)
                        .max(field?.rules?.max, `${field?.label} must be at most ${field?.rules?.max}`);
                    break;

                case 'email':
                    fieldValidation = Yup.string().email(`Please enter a valid ${field?.label}`);
                    break;

                case 'password':
                    fieldValidation = Yup.string()
                        .min(field?.rules?.min, `${field?.label} must be at least ${field?.rules?.min}`)
                        .max(field?.rules?.max, `${field?.label} must be at most ${field?.rules?.max}`);
                    break;

                default:
                    break;
            }

            if (field?.required) {
                fieldValidation = fieldValidation.required(`${field?.label} is required`);
            }

            newValidationSchemaFields[fieldName] = fieldValidation;
        });

        return { initialValues: newInitialValues, validationSchemaFields: newValidationSchemaFields };
    }, [signupSchema])
    const validationSchema = useMemo(() => Yup.object().shape(validationSchemaFields), [validationSchemaFields]);


    const handleSave = async (value: any) => {
        const { identifier, password } = value
        try {
            const response = await fetch('https://api.bemployed.in/api/auth/local', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }),
            });

            setLoader(false)
            if (response.ok === false) {
                const responseData = await response.json();
                toast.error(responseData?.error?.message || "An error occurred during login.")
                setLoader(false)
            }
            if (response.ok === true) {
                const responseData = await response.json();

                localStorage.setItem('jwt', responseData.jwt);
                toast.success("login successful!");
                window.location.href = "/"
                setLoader(false)

            }



        } catch (error: any) {
            const message = error?.message
            toast.error(message || "An error occurred during signup.")
            setLoader(false)
        }
    }
    return (
        <Box>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={handleSave}
                validationSchema={validationSchema}
            >
                <Form>
                    <Grid templateColumns="repeat(12, 1fr)" templateRows="repeat(1,1fr)" gap="4" >

                        {loginSchema.map((field: any, index: any) => (
                            <FormFields key={index} {...field} />
                        ))}

                        <GridItem colSpan={12}>
                            <Button w="full" type='submit' fontWeight="bold" colorScheme='gray' variant='solid' size='md' isLoading={loader} loadingText="loading" >
                                login
                            </Button>
                        </GridItem>

                    </Grid>

                </Form>

            </Formik >
        </Box>

    );
};

export default LoginComponent;
