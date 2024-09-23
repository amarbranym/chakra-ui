/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddIcon, ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Grid, GridItem, Heading, HStack, IconButton, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useStrapiFormContext } from '../../providers/StrapiFormProvider';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormFields from './FormFields';
import { MdOutlineDelete  } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';

const RepeatableForm = ({ fieldsSchema, name = "", type = "RepeatableComponent" }: any) => {
    const { setSchema, data, handleData } = useStrapiFormContext();

    const formValue = Object.hasOwn(data, name) ? data[name] : []
    const [expanded, setExpanded] = useState<string | false>();
    const validationSchemaFields: { [key: string]: any } = {};
    const initialValues: { [key: string]: string } = {};

    fieldsSchema.forEach((field: any) => {
        initialValues[field.name] = '';
        if (field?.required) {
            validationSchemaFields[`${field.name}`] = Yup.string().required(`${field.label || field.name} is required`);
        }
    });
    useEffect(() => {
        setSchema({ type, schema: fieldsSchema, name })
    }, [fieldsSchema, name])
    const validationSchema = Yup.object().shape(validationSchemaFields);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };


    const addForm = () => {
        const uniqueId = uuidv4();
        handleData(name, [...formValue, { id: uniqueId, ...initialValues }]);
        setExpanded(uniqueId)
    };

    const handleFormSubmit = (values: any, id: string) => {
        handleData(name, formValue?.map((edu: any) => {
            if (edu.id === id) {
                return { ...edu, ...values };
            }
            return edu;
        }));
        setExpanded(false)
    };

    const removeForm = (id: string) => {
        handleData(name, formValue.filter((edu: any) => edu.id !== id));
    };

    return (
        <Box>
            <HStack pb="6" justify="space-between" alignItems="center">
                <Heading fontSize="md">Experience</Heading>
                <Button onClick={addForm} colorScheme='gray' size="xs" variant="outline" leftIcon={<SmallAddIcon />} >Add New</Button>
            </HStack>
            <Accordion allowToggle reduceMotion>
                {
                    formValue?.map((val: any, index: any) => (
                        <AccordionItem key={val.id || index}  >
                            <h2>
                                <AccordionButton onClick={() => handleChange(val.id)}>
                                    <Box as='span' flex='1' textAlign='left'>
                                        Section 1 title
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4}>
                                <Formik
                                    initialValues={val}
                                    onSubmit={(values) => handleFormSubmit(values, val.id)}
                                    validationSchema={validationSchema}
                                >
                                    <Form >
                                        <Grid templateColumns="repeat(12, 1fr)" templateRows="repeat(2,1fr)" gap="4" >
                                            {fieldsSchema.map((field: any, index: any) => (
                                                <FormFields key={index} {...field} />
                                            ))}
                                            <GridItem colSpan={12} >
                                                <HStack justify="space-between" alignItems="center">
                                                    <Stack direction="row" gap="2">
                                                        <IconButton variant="solid" colorScheme='gray' size="sm" type='button' aria-label='delete'  icon={<ArrowDownIcon />}/>
                                                        <IconButton variant="solid" colorScheme='gray' size="sm" type='button' aria-label='delete' icon={<ArrowUpIcon />}/>
                                                        <IconButton variant="solid" colorScheme='gray' size="sm" type='button' aria-label='delete' onClick={() => removeForm(val.id)} icon={<MdOutlineDelete />}/>
                                                            
                                                    </Stack>
                                                    <Button type='submit' fontWeight="bold" leftIcon={<SmallAddIcon/>} colorScheme='gray'  variant='solid' size='sm'  >
                                                        Add
                                                    </Button>

                                                </HStack>
                                            </GridItem>
                                        </Grid>
                                    </Form>
                                </Formik>
                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </Box>
    )
}

export default RepeatableForm
