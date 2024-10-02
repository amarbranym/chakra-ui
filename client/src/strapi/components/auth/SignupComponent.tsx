/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import FormFields from '../form/FormFields';
import { signupSchema } from '../../../config/schema/userSchema';
import * as Yup from "yup"
import toast from 'react-hot-toast';
import { useStrapiContext } from '../../providers/StrapiAdmin';

const SignupCompnent = () => {
    const [loader, setLoader] = useState(false)
    const { baseURL } = useStrapiContext()

    const { initialValues, validationSchemaFields } = useMemo(() => {

        const newInitialValues: { [key: string]: any } = {};
        const newValidationSchemaFields: { [key: string]: any } = {};

        signupSchema.forEach((field: any) => {
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

        // Add confirmPassword validation
        newValidationSchemaFields["confirmPassword"] = Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords must match') // Fix: Use undefined instead of null
            .required('Confirm Password is required');

        return { initialValues: newInitialValues, validationSchemaFields: newValidationSchemaFields };
    }, [signupSchema])
    const validationSchema = useMemo(() => Yup.object().shape(validationSchemaFields), [validationSchemaFields]);


    const handleSave = async (value: any) => {
        const { username, password, email } = value
        try {
            const response = await fetch(baseURL + '/auth/local/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            if (response.ok === false) {
                const responseData = await response.json();
                toast.error(responseData?.error?.message || "An error occurred during signup.")
                setLoader(false)
            }

            if (response.ok == true) {
                const responseData = await response.json();
                localStorage.setItem('jwt', responseData.jwt);
                toast.success("Signup successful!");
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
                        {signupSchema.map((field: any, index: any) => (
                            <FormFields key={index} {...field} />
                        ))}
                        <GridItem colSpan={12}>
                            <Button w="full" type='submit' fontWeight="bold" colorScheme='gray' variant='solid' size='md' loadingText="loading" isLoading={loader}  >
                                Signup
                            </Button>
                        </GridItem>
                    </Grid>

                </Form>

            </Formik >
        </Box>

    );
};

export default SignupCompnent;
