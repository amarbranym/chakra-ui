/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Box, Button, Container, Grid, GridItem, Heading, HStack, Stack, Text, VStack, } from '@chakra-ui/react'
import BorderCard from '../../components/BorderCard'
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
        <Container maxW='container.xl' px={[0,0,4]} mb="20" >
            <StrapiFormProvider
                collectionName="students"
                slug={id}
                query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference,Company,Payments"
            >
                {({ submit, isLoading, hasAllErrors, values }) => (
                     <>
                        <HStack my={2} py={2} bg="white" zIndex={100} justify="space-between" alignItems="center" position={"sticky"} top={0}>
                            <>{console.log("Values", values)}</>
                            <Heading as='h2' size="md" noOfLines={1}>
                                <Text as="span" color={"gray.400"}>#{values?.id ?? "New"} </Text>
                                <Text as="span">{values?.personalDetails?.FirstName} {values?.personalDetails?.LastName}</Text>
                            </Heading>
                            <Button isDisabled={false} isLoading={isLoading} loadingText="loading" variant="outline" colorScheme='gray' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                        </HStack>
                        <Grid templateColumns="repeat(6, 1fr)" gap="6" >
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
                                            {values?.CountryCode} {values?.Number}
                                            </Text>)
                                        }} fieldsSchema={phoneNumberSchema} name="Contacts" />
                                    </BorderCard>
                                    <BorderCard>
                                        <RepeatableForm render={(values: any) => {
                                            return (<Text textTransform="capitalize">
                                                {values?.Designation.value} in {values?.Company?.value}
                                            </Text>)
                                        }} fieldsSchema={experienceSchema} name="experience" />
                                    </BorderCard>
                                    <BorderCard>
                                        <RepeatableForm render={(values: any) => {
                                            return (<Text textTransform="capitalize">
                                                {values?.qualification?.value} from {values?.school?.value}
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
                     </>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default CandidateForm
