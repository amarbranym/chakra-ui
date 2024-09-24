/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { AddressSchema, ContactSchema, experienceSchema, otherDetailSchema, personalSchema, qualificationSchema } from '../../example'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import {  Button, Container, Grid, GridItem, Heading, HStack,  Stack,  VStack, } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'
import { useOutletContext } from 'react-router-dom'
import StatusPlugin from '../../plugins/livepreview/StatusPlugin'
import RegistrationPlugin from '../../plugins/livepreview/RegistrationPlugin'
import ViewPlugin from '../../plugins/livepreview/ViewPlugin'
import { BiSave } from 'react-icons/bi'

const CompanyForm = () => {
    const context = useOutletContext<any>();
    return (
        <Container maxW='container.xl' mb="20" >
            <StrapiFormProvider
                collectionName="students"
                slug="60"
                query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference"
            >
                {({ submit, isLoading }) => (
                    <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                        <GridItem colSpan={6}>
                            <HStack justify="space-between" alignItems="center">
                                <Heading as='h2'>{context?.title}</Heading>
                                <Button isLoading={isLoading} loadingText="loading" variant="solid" colorScheme='blue' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                            </HStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, lg: 4 }}>
                            <Stack gap="4">
                                <BorderCard  >
                                    <BasicForm fieldsSchema={personalSchema} name="personalDetails" />
                                </BorderCard>
                                <BorderCard>
                                    <BasicForm fieldsSchema={AddressSchema} name="Address" type='Component' />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm fieldsSchema={ContactSchema} name="Contacts" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm fieldsSchema={experienceSchema} name="experience" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm fieldsSchema={qualificationSchema} name="qualification" />
                                </BorderCard>
                                <BorderCard>
                                    <BasicForm fieldsSchema={otherDetailSchema} name="otherDetails" />
                                </BorderCard>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, lg: 2 }} >
                            <VStack gap="4">
                                
                                <StatusPlugin/>
                                <RegistrationPlugin/>
                                <ViewPlugin/>

                            </VStack>
                        </GridItem>
                    </Grid>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default CompanyForm
