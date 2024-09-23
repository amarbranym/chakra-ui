import React from 'react'
import StrapiList from '../../strapi/components/list/StrapiList'
import { Heading, Stack, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Filters from '../../strapi/components/list/Filters'
import Empty from '../../strapi/components/list/Empty'
import Pagination from '../../strapi/components/list/Pagination'
import Card from '../../strapi/components/list/Card'
import { StrapiContactSchema } from '../../example'

const Contacts = () => {
    return (
            <StrapiList collectionName='contacts' query="populate=*" >
                <Stack mb="6">
                    {/* <BreadCrumbComponent /> */}
                </Stack>
                <Heading as="h2" size="xl"  >
                    Contacts
                </Heading>
                <Stack py={{ base: "4" }}>
                    <Filters fieldSchema={[...StrapiContactSchema]} />
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
                                    <Td>{item?.attributes?.Name}</Td>
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

export default Contacts
