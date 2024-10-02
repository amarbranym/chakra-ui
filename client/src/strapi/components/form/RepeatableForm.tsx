/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddIcon, ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Collapse, Flex, Grid, GridItem, Heading, HStack, IconButton, Stack, VStack } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { useStrapiFormContext } from '../../providers/StrapiFormProvider';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormFields from './FormFields';
import { MdOutlineDelete } from 'react-icons/md';
import { BiCaretDown } from 'react-icons/bi';

const RepeatableForm = ({ fieldsSchema, name = "", type = "RepeatableComponent", render = () => { } }: any) => {
    const { setSchema, data, handleData } = useStrapiFormContext();
    const formValue = Object.hasOwn(data, name) ? data[name] : []

    const [expanded, setExpanded] = useState(-1)

    const { initialValues, validationSchemaFields } = useMemo(() => {
        const newInitialValues: { [key: string]: any } = {};
        const newValidationSchemaFields: { [key: string]: any } = {};
        fieldsSchema.forEach((field: any) => {
            const fieldName = field.name;

            newInitialValues[field.name] = '';

            let fieldValidation: any = Yup.mixed();

            switch (field.type) {
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

                case 'ref:strapi':
                    if (field?.multiple) {
                        fieldValidation = Yup.array()
                            .of(
                                Yup.object().shape({
                                    id: Yup.string().required(`ID is required`),
                                    value: Yup.string().required(`Value is required`),
                                    label: Yup.string().required(`Label is required`),
                                })
                            ).min(1, `${field?.label} must have at least 1 item`);
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


    useEffect(() => {
        setSchema({ type, schema: fieldsSchema, name })
    }, [fieldsSchema, name])

    const addForm = async () => {
        const uniqueId = uuidv4();
        setExpanded(data[name]?.length || 0)
        handleData(name, [...formValue, { id: uniqueId, ...initialValues }]);
    };

    const handleFormSubmit = (values: any, id: string) => {
        handleData(name, formValue?.map((val: any) => {
            if (val.id === id) {
                return { ...val, ...values };
            }
            return val;
        }));
    };

    const removeForm = (id: string) => {
        handleData(name, formValue.filter((val: any) => val.id !== id));
    };

    return <Box>
        <HStack pb="6" justify="space-between" alignItems="center">
            <Heading fontSize="sm" textTransform="capitalize" >{name}</Heading>

            <Button onClick={addForm} colorScheme='gray' size="xs" variant="outline" leftIcon={<SmallAddIcon />} >Add New</Button>
        </HStack>
        <VStack gap='2'>
            {
                formValue?.map((val: any, index: any) => (
                    <Formik
                        key={index}
                        initialValues={val}
                        validateOnChange={true}
                        enableReinitialize
                        onSubmit={async (values) => {
                            handleFormSubmit(values, val.id);
                            setExpanded((prevExpanded) => prevExpanded === index ? -1 : index);
                        }}
                        validationSchema={validationSchema}
                    >
                        {({ errors, values, touched }) => (

                            <Box w="full" >

                                
                                <Flex gap={2} justifyContent={"space-between"} pt={2} alignItems={"center"} borderTopWidth={1}>
                                    <div>
                                        {
                                            expanded === index ? "Edit Item" : render ? <>{render(values)}</> : ("New Item " + (index + 1))
                                        }
                                    </div>
                                    <ButtonGroup variant={"ghost"} px={"2"}>
                                        <Button position={"relative"} size={"sm"} zIndex={1} isDisabled={(Object.keys(errors).length) && (Object.keys(touched).length) ? true : false} onClick={(e) => {
                                            setExpanded(_e => _e === index ? -1 : index)
                                        }}>
                                            {expanded === index ? "-" : "+"}
                                        </Button>
                                    </ButtonGroup>
                                </Flex>
                                <Collapse animateOpacity in={expanded === index} style={{ overflow: "visible" }}   >
                                    <Box py={3} >
                                        <Form >
                                            <Grid templateColumns="repeat(12, 1fr)" templateRows="repeat(2,1fr)" gap="4">
                                                {fieldsSchema.map((field: any, index: any) => (
                                                    <FormFields key={index} {...field} />
                                                ))}
                                                <GridItem colSpan={12} >
                                                    <HStack justify="space-between" alignItems="center">
                                                        <Stack direction="row" gap="2">
                                                            <IconButton variant="solid" colorScheme='gray' size="sm" type='button' aria-label='delete' icon={<ArrowUpIcon />} />
                                                            <IconButton variant="solid" colorScheme='gray' size="sm" type='button' aria-label='delete' icon={<ArrowDownIcon />} />
                                                            <IconButton variant="solid" colorScheme='gray' size="sm" type='button' aria-label='delete' onClick={() => removeForm(val.id)} icon={<MdOutlineDelete />} />
                                                        </Stack>
                                                        <Button type='submit' fontWeight="bold" colorScheme='gray' variant='solid' size='sm'   >
                                                            Save
                                                        </Button>
                                                    </HStack>
                                                </GridItem>
                                            </Grid>
                                        </Form>
                                    </Box>
                                </Collapse>
                            </Box>
                        )}
                    </Formik>
                ))
            }
            <Box borderBottomWidth={1} w="full"></Box>
        </VStack>
    </Box>
}

export default RepeatableForm
