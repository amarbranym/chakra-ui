/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
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
import { candidatesSchema, vacancySchema } from '../../config/schema/vacancySchema'
import { apiFetch, populateData } from '../../strapi/utils/service'
import { useStrapiContext } from '../../strapi/providers/StrapiAdmin'

const VacancyForm = () => {
    const context = useOutletContext<any>();
    const { id } = useParams();
    // const { baseURL } = useStrapiContext()

    const query = "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference"


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
        await apiFetch("http://localhost:1337/api" + `/students/${id}?`, options);

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
        <Container maxW='container.xl' mb="20" >
            <StrapiFormProvider
                collectionName="vacancies"
                slug={id}
                query="populate=Designation,Company,Candidates,Candidates.Student"
                onSave={handleSave}
            >
                {({ submit, isLoading }) => (
                    <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                        <GridItem colSpan={6}>
                            <HStack justify="space-between" alignItems="center">
                                <Heading as='h2'>{context?.title}</Heading>
                                <Button isLoading={isLoading} loadingText="loading" variant="solid" colorScheme='blue' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                            </HStack>
                        </GridItem>
                        <GridItem colSpan={{ base: 6, lg: 6 }}>
                            <Stack gap="4">
                                <BorderCard  >
                                    <BasicForm fieldsSchema={vacancySchema} name="vacancydetails" />
                                </BorderCard>
                                <BorderCard>
                                    <RepeatableForm render={(values: any) => {
                                        return (<span>
                                            {values.Student.label} is {values.Status}
                                        </span>)
                                    }} fieldsSchema={candidatesSchema} name="Candidates" />
                                </BorderCard>
                            </Stack>
                        </GridItem>
                    </Grid>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default VacancyForm
