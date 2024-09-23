import React from 'react'
import { Heading, Stack, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import StrapiList from '../../strapi/components/list/StrapiList';
import Filters from '../../strapi/components/list/Filters';
import Empty from '../../strapi/components/list/Empty';
import Pagination from '../../strapi/components/list/Pagination';
import Card from '../../strapi/components/list/Card';
import { otherDetailSchema, personalSchema } from '../../example';
const Resume = () => {
    return (
            <StrapiList collectionName='students' query="populate=experience.Company.Contacts,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference" >
                <Stack mb="6">
                    {/* <BreadCrumbComponent /> */}
                </Stack>
                <Heading as="h2" size="xl"  >
                    Companies
                </Heading>
                <Stack py={{ base: "4" }}>
                    <Filters fieldSchema={[...personalSchema, ...otherDetailSchema]} />
                </Stack>
                <Stack border="1px solid" borderColor="gray.100" rounded="md">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Email</Th>
                            </Tr>
                        </Thead>
                        <Card
                            renderItem={(item) => (
                                <Tr>
                                    <Td>{item?.attributes?.FirstName}{item?.attributes?.LastName}</Td>
                                    <Td>{item?.attributes?.Email}</Td>
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

export default Resume
