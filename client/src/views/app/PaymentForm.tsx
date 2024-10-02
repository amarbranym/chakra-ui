/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Button, Container, Grid, GridItem, Heading, HStack, Stack, Text, VStack, } from '@chakra-ui/react'
import BorderCard from '../../components/BorderCard'
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
        <Container maxW='container.xl' px={[0,0,4]} mb="20" >
            <StrapiFormProvider
                collectionName="payments"
                slug={id}
                query="populate=Candidate,Company"
            >
                {({ submit, isLoading, hasAllErrors, values }) => (
                    <>
                     <HStack my={2} py={2} bg="white" zIndex={100} justify="space-between" alignItems="center" position={"sticky"} top={0}>
                     <>{console.log("Values", values)}</>
                    <Heading as='h2' size="md" noOfLines={1}>
                            <Text as="span" color={"gray.400"}>#{values?.id ?? "New"} </Text>
                            <Text as="span">{values?.vacancydetails?.Title}</Text>
                        </Heading>
                        <Button isDisabled={false} isLoading={isLoading} loadingText="loading" variant="outline" colorScheme='gray' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                    </HStack>
                    <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                        <GridItem colSpan={{ base: 6, lg: 6 }}>
                            <Stack gap="4">
                                <BorderCard  >
                                    <BasicForm fieldsSchema={paymentSchema} name="paymentsDetails" />
                                </BorderCard>

                            </Stack>
                        </GridItem>

                    </Grid>
                    </>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default PaymentForm
