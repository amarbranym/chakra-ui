/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, ButtonGroup, Heading, HStack, Stack, Table, Td, Text, Th, Thead, Tr, VStack, Link as Anchor } from '@chakra-ui/react';
import StrapiList from '../../strapi/components/list/StrapiList';
import Filters from '../../strapi/components/list/Filters';
import Empty from '../../strapi/components/list/Empty';
import Pagination from '../../strapi/components/list/Pagination';
import Card from '../../strapi/components/list/Card';
import { Link, useOutletContext } from 'react-router-dom';
import { AddIcon } from '@chakra-ui/icons';
import { otherDetailSchema, personalSchema } from '../../config/schema/candidateSchemas';
import SearchBox from '../../strapi/components/list/SearchBox';
import { datesSechema, idSchema } from '../../config/schema/filterOprators';
import { candidatesSchema } from '../../config/schema/vacancySchema';
import { extractCountryCode, formatDateDD_MM_YYYY } from '../../strapi/utils/service';
import CreateButton from '../../components/CreateButton';
import Tabs from '../../strapi/components/list/Tabs';
import DeleteButton from '../../components/DeleteButton';


const CandidatesList = () => {
    const context = useOutletContext<any>();
    const handleMapValue = (value: any) => {
        const result = value && value.map((item: any) => {
            return item?.attributes?.name
        })

        return result.join(", ")
    };
    const handleMapValueIndustry = (value: any) => {
        const result = value && value.map((item: any) => {
            return item?.attributes?.Name
        })

        return result.join(", ")
    };
    return (
        <StrapiList collectionName='students' query={[
            {
                title: "All",
                query: "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Payment&sort[0]=createdAt:desc"
            },
            {
                title: "Hired",
                query: "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Payment&sort[0]=createdAt:desc&filters[Status][$eq]=Hired"
            },
            {
                title: "In Probation",
                query: "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Payment&sort[0]=createdAt:desc&filters[Status][$eq]=In Probation"
            },
            {
                title: "In Process",
                query: "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Payment&sort[0]=createdAt:desc&filters[Status][$eq]=In Process"
            },
            {
                title: "Blacklist",
                query: "populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Payment&sort[0]=createdAt:desc&filters[Status][$eq]=Black List"
            },
        ]} >
            <Stack mb="6">
                {/* <BreadCrumbComponent /> */}
            </Stack>

            <HStack justify="space-between" alignItems="center">
                <Heading as='h2'>{context?.title}</Heading>
                <CreateButton link="/candidate/create"/>
            </HStack>
            <VStack gap="2" py={2} flexDirection={{base: "column", md: "row"}} alignItems={"flex-start"}>
                <SearchBox />
                <Stack>
                    <Filters fieldSchema={[...personalSchema, ...otherDetailSchema, ...idSchema, ...datesSechema,
                    ...candidatesSchema.filter((item: any) => ["date", "number", "select"].includes(item.type))]} >
                        <Button leftIcon={<AddIcon />} size="sm" variant='outline' >Add Filter</Button>
                    </Filters>
                </Stack>
            </VStack>
            <Stack mb={2} overflowX={"auto"}>
                <Tabs/>
            </Stack>
            <Stack border="1px solid" borderColor="gray.100" rounded="md" overflowX={"scroll"}>
                <Table whiteSpace={"nowrap"}>
                    <Thead>
                        <Tr>
                            <Th bg="white">Id</Th>
                            <Th>Name</Th>
                            <Th>Father Name</Th>
                            <Th>Contact</Th>
                            <Th>Gender</Th>
                            <Th>Status</Th>
                            <Th>Skills</Th>
                            <Th>Industry</Th>
                            <Th>Created At</Th>
                            <Th bg="white">Actions</Th>
                        </Tr>
                    </Thead>
                    <Card
                        renderItem={(item, deleteDoc = () => {}) => (
                            <Tr>
                                <Td bg="white">{item?.id}</Td>
                                <Td>{item?.attributes?.FirstName}{" "}{item?.attributes?.LastName}</Td>
                                <Td>{item?.attributes?.FatherName}</Td>
                                <Td>
                                    <Anchor
                                        color="blue"
                                        textDecoration={"underline"}
                                        href={"tel::" + extractCountryCode(item?.attributes?.Contacts[0]?.CountryCode) + item?.attributes?.Contacts[0]?.Number}
                                    >
                                        {extractCountryCode(item?.attributes?.Contacts[0]?.CountryCode)}{item?.attributes?.Contacts[0]?.Number}
                                    </Anchor>
                                </Td>
                                <Td>{item?.attributes?.Gender}</Td>
                                <Td>{item?.attributes?.Status}</Td>
                                <Td maxW={"xs"} overflow={"hidden"} textOverflow={"ellipsis"}>{handleMapValue(item?.attributes?.Skills?.data)}</Td>
                                <Td maxW={"xs"} overflow={"hidden"} textOverflow={"ellipsis"}>{handleMapValueIndustry(item?.attributes?.IndustriesPreference?.data)}</Td>
                                <Td>{formatDateDD_MM_YYYY(item?.attributes?.createdAt)}</Td>
                                <Td bg="white">
                                    <ButtonGroup size="sm" variant="solid">
                                        <Button as={Link} to={`/candidate/${item.id}`} >Edit</Button>
                                        <Button as={Link} to={`/student/preview/${item.id}`} >View</Button>
                                        <DeleteButton onClick={() => {deleteDoc(item?.id)}} />
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        )}
                    />
                </Table>
            </Stack>
            <Empty>
                <Text fontSize="medium">
                    no data found
                </Text>
            </Empty>
            <Stack mt="10" alignItems="center">
                <Pagination />
            </Stack>
        </StrapiList>

    )
}

export default CandidatesList
