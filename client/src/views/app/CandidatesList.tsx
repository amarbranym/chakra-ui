/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, Heading, HStack, Stack, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
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
        <StrapiList collectionName='students' query="populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,Company,IndustriesPreference,Payment" >
            <Stack mb="6">
                {/* <BreadCrumbComponent /> */}
            </Stack>

            <HStack justify="space-between" alignItems="center">
                <Heading as='h2'>{context?.title}</Heading>
                <Button as={Link} variant="solid" colorScheme='blue' size="md" leftIcon={<AddIcon />} to={`/candidate/create`} >Create new entry</Button>
            </HStack>
            <HStack gap="4">
                <SearchBox />
                <Stack py={{ base: "4" }}>
                    <Filters fieldSchema={[...personalSchema, ...otherDetailSchema, ...idSchema, ...datesSechema,
                    ...candidatesSchema.filter((item:any) => ["date","number", "select"].includes(item.type))]} />
                </Stack>
            </HStack>
            <Stack border="1px solid" borderColor="gray.100" rounded="md">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Name</Th>
                            <Th>Contact</Th>
                            <Th>Gender</Th>
                            <Th>Status</Th>
                            <Th>Skills</Th>
                            <Th>Industry</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Card
                        renderItem={(item) => (
                            <Tr>
                                <Td>{item?.id}</Td>
                                <Td>{item?.attributes?.FirstName}{" "}{item?.attributes?.LastName}</Td>
                                <Td>{item?.attributes?.Contacts[0]?.Number}</Td>
                                <Td>{item?.attributes?.Gender}</Td>
                                <Td>{item?.attributes?.Status}</Td>
                                <Td>{handleMapValue(item?.attributes?.Skills?.data)}</Td>
                                <Td>{handleMapValueIndustry(item?.attributes?.IndustriesPreference?.data)}</Td>
                                <Td display="flex" gap="2">
                                    <Button size="sm" variant="solid" as={Link} to={`/candidate/${item.id}`} >Edit</Button>
                                    <Button size="sm" variant="solid" target='_blank' as={Link} to={`/student/preview/${item.id}`} >View</Button>
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
