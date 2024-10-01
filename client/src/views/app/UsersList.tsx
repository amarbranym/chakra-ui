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
import { userSchema } from '../../config/schema/userSchema';
import SearchBox from '../../strapi/components/list/SearchBox';
import { datesSechema, idSchema } from '../../config/schema/filterOprators';
import { formatDateDD_MM_YYYY } from '../../strapi/utils/service';

const UsersList = () => {
    const context = useOutletContext<any>()

    return (
        <StrapiList collectionName='users' query="populate=*" >
            <Stack mb="6">
                {/* <BreadCrumbComponent /> */}
            </Stack>
            <HStack justify="space-between" alignItems="center">
                <Heading as='h2'>{context?.title}</Heading>
                <Button as={Link} variant="solid" colorScheme='blue' size="md" leftIcon={<AddIcon />} to={`/user/create`} >Create new entry</Button>
            </HStack>
            <HStack gap="4">
                <SearchBox />
                <Stack py={{ base: "4" }}>
                    <Filters fieldSchema={[...userSchema, ...idSchema, ...datesSechema]} />
                </Stack></HStack>
            <Stack border="1px solid" borderColor="gray.100" rounded="md">
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>username</Th>
                            <Th>Email</Th>
                            <Th>Created At</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Card
                        renderItem={(item) => (
                            <Tr>
                                <Td>{item?.id}</Td>
                                <Td>{item?.username}</Td>
                                <Td>{item?.email}</Td>
                                <Td>{formatDateDD_MM_YYYY(item?.attributes?.createdAt)}</Td>
                                <Td><Button size="sm" variant="ghost" as={Link} to={`/user/${item.id}`} >Edit</Button></Td>
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

export default UsersList
