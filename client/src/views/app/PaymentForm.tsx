/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Button, Container, Grid, GridItem, Heading, HStack, Stack, VStack, } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import { useOutletContext, useParams } from 'react-router-dom'
import StatusPlugin from '../../plugins/livepreview/StatusPlugin'
import RegistrationPlugin from '../../plugins/livepreview/RegistrationPlugin'
import ViewPlugin from '../../plugins/livepreview/ViewPlugin'
import { BiSave } from 'react-icons/bi'
import { paymentSchema } from '../../config/schema/paymentSchema'

const PaymentForm = () => {
    const context = useOutletContext<any>();
    const { id } = useParams()
    return (
        <Container maxW='container.xl' mb="20" >
            <StrapiFormProvider
                collectionName="payments"
                slug={id}
                query="populate=Candidate,Company"
            >
                {({ submit, isLoading, hasAllErrors }) => (
                    <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                        <GridItem colSpan={6}>
                            <HStack justify="space-between" alignItems="center">
                                <Heading as='h2'>{context?.title}</Heading>
                                <Button isLoading={isLoading} loadingText="loading" isDisabled={hasAllErrors} variant="solid" colorScheme='blue' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                            </HStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, lg: 6 }}>
                            <Stack gap="4">
                                <BorderCard  >
                                    <BasicForm fieldsSchema={paymentSchema} name="paymentsDetails" />
                                </BorderCard>

                            </Stack>
                        </GridItem>

                    </Grid>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default PaymentForm
