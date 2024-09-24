/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AddIcon, ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon, DeleteIcon, SmallAddIcon } from '@chakra-ui/icons'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Collapse, Grid, GridItem, Heading, HStack, IconButton, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useStrapiFormContext } from '../../providers/StrapiFormProvider';
import { v4 as uuidv4 } from 'uuid';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import FormFields from './FormFields';
import { MdOutlineDelete } from 'react-icons/md';
import { BiCaretDown, BiPlus } from 'react-icons/bi';

const RepeatableForm = ({ fieldsSchema, name = "", type = "RepeatableComponent", render = () => { } }: any) => {
    const { setSchema, data, handleData } = useStrapiFormContext();
    const formValue = Object.hasOwn(data, name) ? data[name] : []
    const validationSchemaFields: { [key: string]: any } = {};
    const initialValues: { [key: string]: string } = {};

    const [expanded, setExpanded] = useState(-1)

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

    const addForm = async () => {
        const uniqueId = uuidv4();
        setExpanded(data[name]?.length)
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
            {/* <Accordion allowToggle reduceMotion> */}<>
                {
                    formValue?.map((val: any, index: any) => (
                        <Formik
                            key={index}
                            initialValues={val}
                            onSubmit={(values) => handleFormSubmit(values, val.id)}
                            validationSchema={validationSchema}
                        >
                            {({ errors, values, touched }) => (
                                // <AccordionItem isDisabled={Object.keys(errors).length && touched ? true : false} key={val.id || index}  >
                                    // {({ isExpanded, isDisabled }) => (
                                        <div>
                                            {/* <h2> */}
                                                {/* <AccordionButton > */}
                                                    <Button isDisabled={(Object.keys(errors).length) ? true : false} onClick={(e) => {
                                                        
                                                            setExpanded(_e => _e === index ? -1 : index)
                                                        
                                                    }} w="full" variant={"ghost"} py={0} px={2} justifyContent={"space-between"} rightIcon={<BiCaretDown/>} flex='1' textAlign='left'>
                                                        {
                                                            expanded === index ? "Edit Item" : render ? render(values) : ("New Item " + (index + 1))
                                                        }
                                                    </Button>
                                                    {/* <AccordionIcon /> */}
                                                {/* </AccordionButton> */}
                                            {/* </h2> */}
                                            <Collapse animateOpacity in={expanded === index}>
                                                <Box p={3}>
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
                                                                {/* <AccordionButton disabled={Object.keys(errors).length ? true : false}
                                                                    w="fit-content" p="0"> */}
                                                                    <Button disabled={Object.keys(errors).length ? true : false} type='submit' fontWeight="bold" colorScheme='gray' variant='solid' size='sm'  >
                                                                        Save
                                                                    </Button>
                                                                {/* </AccordionButton> */}
                                                            </HStack>
                                                        </GridItem>
                                                    </Grid>
                                                </Form>
                                                </Box>
                                            </Collapse>
                                        </div>
                                //     )}
                                // </AccordionItem>
                            )}
                        </Formik>
                    ))
                }
            </>
        </Box>
}

export default RepeatableForm
