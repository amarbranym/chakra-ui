import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { AddressSchema, ContactSchema, experienceSchema, otherDetailSchema, personalSchema, qualificationSchema } from '../../example'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Box, Button, Container, Grid, GridItem, Heading, HStack, Select, Stack, Text, VStack, } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'
import { BiLinkExternal, BiSave } from 'react-icons/bi'

const ResumeForm = () => {
    return (
        <Container maxW='container.xl' mb="20" >
            <StrapiFormProvider
                collectionName="students"
                slug="37"
                query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference"
            >
                {({ submit }) => (
                    <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                        <GridItem colSpan={6}>
                            <HStack justify="space-between" alignItems="center">
                                <Heading as='h2'>Title Here</Heading>
                                <Button variant="solid" colorScheme='blue' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
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
                                <BorderCard>
                                    <Box display="flex" flexDirection="column" gap="2">
                                        <Heading as="h4" fontSize="larger">Publish Document</Heading>
                                        <Text fontFamily="" fontSize="medium" >Publish this document to view resume, and add other records like Interviews, Payments etc.</Text>
                                        <HStack>
                                            <Button variant="outline" colorScheme='green' size="md"   >Publish</Button>
                                        </HStack>
                                    </Box>
                                </BorderCard>
                                <BorderCard>
                                    <Box display="flex" flexDirection="column" gap="2">
                                        <Heading as="h4" fontSize="larger">Change Status</Heading>
                                        <Text fontFamily="" fontSize="medium" >
                                            If you want to change the status for anything, you can change it using this plugin.
                                        </Text>
                                        <HStack gap="2">
                                            <Select size='md' placeholder="Demo Period" _placeholder={{ color: "orange.500", fontWeight: "bold" }} colorScheme='' >
                                            </Select>
                                            <Button variant="solid" colorScheme='gray' size="md"   >Apply</Button>
                                        </HStack>
                                    </Box>
                                </BorderCard>
                                <BorderCard>
                                    <Box display="flex" flexDirection="column" gap="2">
                                        <Heading as="h4" fontSize="larger">Pay Registration</Heading>
                                        <Text fontFamily="" fontSize="medium" >Pay Rs. 500/- for this candidate, if already paid please ignore.</Text>
                                        <HStack>
                                            <Button variant="outline" colorScheme='purple' size="md"   >Pay Now</Button>
                                        </HStack>
                                    </Box>
                                </BorderCard>
                                <BorderCard>
                                    <Box display="flex" flexDirection="column" gap="2">
                                        <Heading as="h4" fontSize="larger">View Resume</Heading>
                                        <Text fontFamily="" fontSize="medium" >View, Download or Print the resume with T&Cs for this candidate.</Text>
                                        <HStack>
                                            <Button variant="outline" colorScheme='gray' size="md" rightIcon={<BiLinkExternal />}   >View</Button>
                                        </HStack>
                                    </Box>
                                </BorderCard>
                            </VStack>
                        </GridItem>
                    </Grid>
                )}
            </StrapiFormProvider>

        </Container >
    )
}

export default ResumeForm
