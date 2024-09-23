import React from 'react';
import { Heading, Stack, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import StrapiList from '../../strapi/components/list/StrapiList';
import Filters from '../../strapi/components/list/Filters';
import Empty from '../../strapi/components/list/Empty';
import Pagination from '../../strapi/components/list/Pagination';
import Card from '../../strapi/components/list/Card';
import { companySchema } from '../../example';
const Companies = () => {
    return (
            <StrapiList collectionName='companies' query="populate=City,Industry,Contact" >
              
                <Heading as="h2" size="xl"  >
                    Companies
                </Heading>
                <Stack py={{ base: "4" }}>
                    <Filters fieldSchema={[...companySchema]} />
                </Stack>
                <Stack border="1px solid" borderColor="gray.100" rounded="md">
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>City</Th>
                            </Tr>
                        </Thead>
                        <Card
                            renderItem={(item) => (
                                <Tr>
                                    <Td>{item?.attributes?.Name}</Td>
                                    <Td>{item?.attributes?.City?.data?.attributes?.Name}</Td>
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
    );
};

export default Companies;
