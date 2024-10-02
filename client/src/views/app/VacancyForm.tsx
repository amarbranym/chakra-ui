/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Button, Container, Grid, GridItem, Heading, HStack, Stack, Text, VStack, } from '@chakra-ui/react'
import BorderCard from '../../components/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'
import { useOutletContext, useParams } from 'react-router-dom'
import StatusPlugin from '../../plugins/livepreview/StatusPlugin'
import RegistrationPlugin from '../../plugins/livepreview/RegistrationPlugin'
import ViewPlugin from '../../plugins/livepreview/ViewPlugin'
import { BiSave } from 'react-icons/bi'
import { candidatesSchema, vacancySchema } from '../../config/schema/vacancySchema'
import { apiFetch, populateData } from '../../strapi/utils/service'
import { useStrapiContext } from '../../strapi/providers/StrapiAdmin'

const VacancyForm = () => {
    const context = useOutletContext<any>();
    const { id } = useParams();
    const { baseURL } = useStrapiContext()
    const query = "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Candidates"


    const handleUpdate = async (id: string, Candidates: any, Company: any) => {
        const { DateOfHiring, SalaryNegotiation, Status } = Candidates;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    Company, DateOfHiring, SalaryNegotiation, Status
                }
            }),
            credentials: 'include',
        };
        await apiFetch(baseURL + `/students/${id}?`, options);

    }

    const handleSave = async (values: any) => {
        const { data } = JSON.parse(values)

        const promises = data?.Candidates && data?.Candidates.map(async (candidate: any) => {
            const studentId = candidate.Student?.connect[0]?.id;
            console.log(studentId)
            if (studentId) {
                try {
                    const result = await handleUpdate(studentId, candidate, data?.Company);
                    return result;
                } catch (error) {
                    console.error(`Error fetching document for student ID ${studentId}:`, error);
                }
            } else {
                console.warn("No student ID found for candidate:", candidate);
            }
        });


    };

    return (
        <Container maxW='container.xl' mb="20" px={[0,0,4]} >
            <StrapiFormProvider
                collectionName="vacancies"
                slug={id}
                query="populate=Designation,Company,Candidates,Candidates.Student"
                onSave={handleSave}
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
                                    <BasicForm fieldsSchema={vacancySchema} name="vacancydetails" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm render={(values: any) => {
                                        return (<Text textTransform="capitalize">
                                            {values?.Student?.label} is {values?.Status}
                                        </Text>)
                                    }} fieldsSchema={candidatesSchema} name="Candidates" />
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

export default VacancyForm
