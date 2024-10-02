/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Button, Container, Grid, GridItem, Heading, HStack, Stack, Text, VStack, } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'
import { useOutletContext, useParams } from 'react-router-dom'
import StatusPlugin from '../../plugins/livepreview/StatusPlugin'
import RegistrationPlugin from '../../plugins/livepreview/RegistrationPlugin'
import ViewPlugin from '../../plugins/livepreview/ViewPlugin'
import { BiSave } from 'react-icons/bi'
import { addressSchema, experienceSchema, otherDetailSchema, personalSchema, qualificationSchema } from '../../config/schema/candidateSchemas'
import { phoneNumberSchema } from '../../config/schema/phoneNumberSchema'
import CandidateInfo from '../../plugins/livepreview/CandidateInfo'

const CandidateForm = () => {
    const context = useOutletContext<any>();
    const { id } = useParams()
    return (
        <Container maxW='container.xl' mb="20" >
            <StrapiFormProvider
                collectionName="students"
                slug={id}
                query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference,Company,Payments"
            >
                {({ submit, isLoading, hasAllErrors }) => (
                    <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                        <GridItem colSpan={6}>
                            <HStack justify="space-between" alignItems="center">
                                <Heading as='h2'>{context?.title}</Heading>
                                <Button isDisabled={hasAllErrors} isLoading={isLoading} loadingText="loading" variant="solid" colorScheme='blue' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                            </HStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, lg: id ? 4 : 6 }}>
                            <Stack gap="4">
                                <BorderCard  >
                                    <BasicForm fieldsSchema={personalSchema} name="personalDetails" />
                                </BorderCard>
                                <BorderCard>
                                    <BasicForm fieldsSchema={addressSchema} name="Address" type='Component' />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm render={(values: any) => {
                                        return (<Text textTransform={"capitalize"}>
                                            Contact number {values?.CountryCode} {" "}{values?.Number} address type {values?.Type}
                                            {
                                                console.log(values)
                                            }
                                        </Text>)
                                    }} fieldsSchema={phoneNumberSchema} name="Contacts" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm render={(values: any) => {
                                        return (<Text textTransform="capitalize">
                                            {values?.Duration} {values?.Designation.value} in {values?.Company?.value}
                                        </Text>)
                                    }} fieldsSchema={experienceSchema} name="experience" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm render={(values: any) => {
                                        return (<Text textTransform="capitalize">
                                            {values?.qualification?.value}  at {values?.school?.value}
                                        </Text>)
                                    }} fieldsSchema={qualificationSchema} name="qualification" />
                                </BorderCard>
                                <BorderCard>
                                    <BasicForm fieldsSchema={otherDetailSchema} name="otherDetails" />
                                </BorderCard>
                            </Stack>
                        </GridItem>
                        {
                            id && <GridItem colSpan={{ base: 6, lg: 2 }} >
                                <VStack gap="4">
                                    <CandidateInfo />
                                    <ViewPlugin studentId={id} route="student/preview" />

                                </VStack>
                            </GridItem>
                        }

                    </Grid>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default CandidateForm
