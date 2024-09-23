import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { AddressSchema, ContactSchema, personalSchema } from '../../example'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Container, Grid, GridItem, Stack, } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'

const CompanyForm = () => {
    return (
        <Container maxW='container.xl' overflow="auto">
            <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                <GridItem colSpan={4}>
                    <StrapiFormProvider
                        collectionName="students"
                        // slug="58"
                        query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference"
                    >
                        {({ submit }) => (
                            <Stack gap="4">
                                <BorderCard  >
                                    <BasicForm fieldsSchema={personalSchema} name="personalDetails" />
                                </BorderCard>
                                {/* <BorderCard>

                                    <BasicForm fieldsSchema={AddressSchema} name="Address" type='Component' />
                                </BorderCard> */}
                                <BorderCard>
                                    <RepeatableForm fieldsSchema={ContactSchema} name="Contacts" />
                                </BorderCard>
                                {/* <RepeatableForm fieldsSchema={experienceSchema} name="experience" /> */}
                                {/* <RepeatableForm fieldsSchema={qualificationSchema} name="qualification" /> */}
                                {/* <BasicForm fieldsSchema={otherDetailSchema} name="otherDetails" /> */}
                                {/* <button className='mt-4 p-2 bg-blue-600 text-white rounded-md' type='submit' onClick={submit}>submit</button> */}
                            </Stack>
                        )}
                    </StrapiFormProvider>
                </GridItem>
                <GridItem colSpan={2}>plugin</GridItem>
            </Grid>
        </Container>
    )
}

export default CompanyForm
