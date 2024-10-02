/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Form, Formik } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { useStrapiFormContext } from '../../providers/StrapiFormProvider';
import FormFields from './FormFields';
import { Box, Grid, Heading, HStack } from '@chakra-ui/react';
import * as Yup from "yup"

interface BasicFromProps {
    fieldsSchema: any;
    name?: string,
    type?: string,
}
const BasicForm: React.FC<BasicFromProps> = ({ fieldsSchema, name = "", type = "Basic" }) => {

    const { setSchema, initialData: data, handleErrors, handleData } = useStrapiFormContext();

    const formValue = Object.hasOwn(data, name) ? data[name] : {}

    useEffect(() => {
        setSchema({ type, schema: fieldsSchema, name })
    }, [fieldsSchema, name])

    const { initialValues, validationSchemaFields } = useMemo(() => {

        const newInitialValues: { [key: string]: any } = {};
        const newValidationSchemaFields: { [key: string]: any } = {};

        fieldsSchema.forEach((field: any) => {
            const fieldName = field?.name;

            if (field?.multiple) {
                newInitialValues[fieldName] = formValue[fieldName] ? formValue[fieldName] : [];
            } else {
                newInitialValues[fieldName] = formValue[fieldName] ? formValue[fieldName] : '';
            }

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

                case 'number':
                    fieldValidation = Yup.number()
                        .min(field?.rules?.min, `${field?.label} must be at least ${field?.rules?.min}`)
                        .max(field?.rules?.max, `${field?.label} must be at most ${field?.rules?.max}`);
                    break;
                case 'password':
                    fieldValidation = Yup.string()
                        .min(field?.rules?.min, `${field?.label} must be at least ${field?.rules?.min}`)
                        .max(field?.rules?.max, `${field?.label} must be at most ${field?.rules?.max}`);
                    break;

                case 'ref:strapi':
                    if (field?.multiple) {
                        fieldValidation = Yup.array().of(
                            Yup.object().shape({
                                id: Yup.string(),
                                value: Yup.string(),
                                label: Yup.string(),
                            })
                        );
                    } else {
                        fieldValidation = Yup.object().shape({
                            id: Yup.string(),
                            value: Yup.string(),
                            label: Yup.string(),
                        });
                    }
                    break;

                case 'select':
                    fieldValidation = Yup.string();
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
    }, [fieldsSchema, formValue])
    const validationSchema = useMemo(() => Yup.object().shape(validationSchemaFields), [validationSchemaFields]);

    return (
        <Box>
            {type === "Component" && <HStack pb="6" justify="space-between" alignItems="center">
                <Heading fontSize="sm" textTransform="capitalize" >{name}</Heading>
            </HStack>}
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={() => { }}
                validate={(values: any) => {
                    handleData(name, values)
                    validationSchema.validate(values).then(() => {
                        console.log("validate", values)
                        handleErrors(name, 0)
                    }).catch(e => {
                        handleErrors(name, 1)
                    })
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <Grid templateColumns="repeat(12, 1fr)" templateRows="repeat(1,1fr)" gap="4" >
                        {fieldsSchema.map((field: any, index: any) => (
                            <FormFields key={index} {...field} />
                        ))}
                    </Grid>
                </Form>

            </Formik >
        </Box>
    )
}

export default BasicForm
