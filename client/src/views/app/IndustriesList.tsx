/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import StrapiList from '../../strapi/components/list/StrapiList'
import { Button, Heading, HStack, Stack, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import Filters from '../../strapi/components/list/Filters'
import Empty from '../../strapi/components/list/Empty'
import Pagination from '../../strapi/components/list/Pagination'
import Card from '../../strapi/components/list/Card'
import { Link, useOutletContext } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { industrySchema } from '../../config/schema/industrySchema'
import { datesSechema, idSchema } from '../../config/schema/filterOprators'

const IndustriesList = () => {
    const context = useOutletContext<any>()
    return (
        <StrapiList collectionName='industries' query="populate=*" >
            <Stack mb="6">
                {/* <BreadCrumbComponent /> */}
            </Stack>
            <HStack justify="space-between" alignItems="center">
                <Heading as='h2'>{context?.title}</Heading>
                <Button as={Link} variant="solid" colorScheme='blue' size="md" leftIcon={<AddIcon />} to={`/industry/create`} >Create new entry</Button>
            </HStack>
            <Stack py={{ base: "4" }}>
                <Filters fieldSchema={[...industrySchema, ...idSchema, ...datesSechema]} />
            </Stack>
            <Stack border="1px solid" borderColor="gray.100" rounded="md">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Card
                        renderItem={(item) => (
                            <Tr>
                                <Td>{item?.attributes?.Name}</Td>
                                <Td><Button size="sm" variant="solid" as={Link} to={`/industry/${item.id}`} >Edit</Button></Td>

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

export default IndustriesList
