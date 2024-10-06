/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import BasicForm from '../../strapi/components/form/BasicForm'
import { StrapiFormProvider } from '../../strapi/providers/StrapiFormProvider'
import { Badge, Box, Button, Card, Center, Container, Flex, Grid, GridItem, Heading, HStack, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, } from '@chakra-ui/react'
import BorderCard from '../../components/BorderCard'
import RepeatableForm from '../../strapi/components/form/RepeatableForm'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import ViewPlugin from '../../plugins/livepreview/ViewPlugin'
import { BiSave } from 'react-icons/bi'
import { addressSchema, experienceSchema, interviewSchema, otherDetailSchema, personalSchema, qualificationSchema, statusSchema } from '../../config/schema/candidateSchemas'
import { phoneNumberSchema } from '../../config/schema/phoneNumberSchema'
import CandidateInfo from '../../plugins/livepreview/CandidateInfo'
import useFormData from '../../strapi/hooks/useFormData'
import { formatDateDD_MM_YYYY } from '../../strapi/utils/service'
import { AddIcon, ExternalLinkIcon } from '@chakra-ui/icons'

const Payments = () => {

    const { Payments } = useFormData()

    return <VStack>
        {Payments?.data?.map((payment: any, index: number) => <Flex key={index} w="full" p={3} borderWidth={1} rounded={"md"} as={Link} to={`/payment/${payment.id}`} gap={2} _hover={{ bg: "gray.100" }}>
            <Badge colorScheme={payment?.attributes?.Status === "Pending" ? "yellow" : "green"}>{payment?.attributes?.Status}</Badge>
            <Heading size="xs" textTransform={"uppercase"}>Rs. {payment?.attributes?.Amount}/-</Heading>
            <Badge ml="auto">on {formatDateDD_MM_YYYY(payment?.attributes?.CollectionDate)}</Badge>
            <ExternalLinkIcon />
        </Flex>)}
        {Payments?.data?.length === 0 && <Center py={6}>
            <Heading color={"gray.300"}>No Payments</Heading>
        </Center>}
    </VStack>
}

const CandidateForm = () => {
    const context = useOutletContext<any>();
    const { id } = useParams()
    return (
        <Container maxW='container.xl' px={[0, 0, 4]} mb="20" >
            <StrapiFormProvider
                collectionName="students"
                slug={id}
                query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference,Company,Payments,Designation,Interviews,Interviews.Company,Payments.Amount"
            >
                {({ submit, isLoading, hasAllErrors, values }) => (
                    <>
                        <HStack my={2} py={2} bg="white" zIndex={100} justify="space-between" alignItems="center" position={"sticky"} top={0}>
                            {/* <>{console.log("Values", values)}</> */}
                            <Heading as='h2' size="md" noOfLines={1}>
                                <Text as="span" color={"gray.400"}>#{values?.id ?? "New"} </Text>
                                <Text as="span">{values?.personalDetails?.FirstName} {values?.personalDetails?.LastName}</Text>
                            </Heading>
                            <Button isDisabled={false} isLoading={isLoading} loadingText="loading" variant="outline" colorScheme='gray' size="md" leftIcon={<BiSave />} onClick={submit} >Save</Button>
                        </HStack>
                        <Grid templateColumns="repeat(6, 1fr)" gap="6" >
                            <GridItem order={{ base: 2, lg: 1 }} colSpan={{ base: 6, lg: id ? 4 : 6 }}>
                                <Tabs >
                                    {id && <TabList>
                                        <Tab>Basic Details</Tab>
                                        <Tab>History</Tab>
                                        <Tab>Payments</Tab>
                                    </TabList>}
                                    <TabPanels>
                                        <TabPanel px={0}>
                                            <Stack gap="4">
                                                <BorderCard>
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
                                        </TabPanel>
                                        <TabPanel px={0}>
                                            <Stack gap="4">
                                                <BorderCard>
                                                    <RepeatableForm render={(values: any) => {
                                                        return (<Flex gap={2} flexDirection={{ base: "column", sm: "row" }} alignItems={{ base: "flex-start", sm: "center" }} textTransform="capitalize">
                                                            <Badge>{values.Result}</Badge>
                                                            <Text>Interview with {values?.Company?.label} on {formatDateDD_MM_YYYY(values?.DateOfInterview)}</Text>
                                                            <>{console.log(values)}</>
                                                        </Flex>)
                                                    }} fieldsSchema={interviewSchema} name="Interviews" />
                                                </BorderCard>
                                                <BorderCard>
                                                    <BasicForm fieldsSchema={statusSchema} name="statusDetails" />
                                                </BorderCard>
                                            </Stack>
                                        </TabPanel>
                                        <TabPanel px={0}>
                                            <Payments />
                                            <Center py={3}>
                                                <Button leftIcon={<AddIcon />}>Create New Payment</Button>
                                            </Center>
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </GridItem>
                            {
                                id && <GridItem order={{ base: 1, lg: 2 }} colSpan={{ base: 6, lg: 2 }} >
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
