/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Button, Container, Grid, GridItem, Heading, HStack, Stack, VStack, } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'
import { useOutletContext, useParams } from 'react-router-dom'
import StatusPlugin from '../../plugins/livepreview/StatusPlugin'
import RegistrationPlugin from '../../plugins/livepreview/RegistrationPlugin'
import ViewPlugin from '../../plugins/livepreview/ViewPlugin'
import { BiSave } from 'react-icons/bi'
import { phoneNumberSchema } from '../../config/schema/phoneNumberSchema'
import { contactsSchema } from '../../config/schema/contactsSchema'

const ContactForm = () => {
    const context = useOutletContext<any>();
    const { id } = useParams()
    return (
        <Container maxW='container.xl' mb="20" >
            <StrapiFormProvider
                collectionName="contacts"
                slug={id}
                query="populate=Phone,Companies"
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
                                    <BasicForm fieldsSchema={contactsSchema} name="contactdetails" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm render={(values: any) => {
                                        console.log(values)
                                        return (<span>
                                            {values.CountryCode} years of experience as {values.Type.value} in {values.Number}
                                        </span>)
                                    }} fieldsSchema={phoneNumberSchema} name="Phone" />
                                </BorderCard>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, lg: 2 }} >
                            <VStack gap="4">
                                <StatusPlugin />
                                <RegistrationPlugin />
                                <ViewPlugin />
                            </VStack>
                        </GridItem>
                    </Grid>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default ContactForm
