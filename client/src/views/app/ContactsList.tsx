/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import StrapiList from '../../strapi/components/list/StrapiList'
import { Button, Heading, HStack, Stack, Table, Td, Text, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import Filters from '../../strapi/components/list/Filters'
import Empty from '../../strapi/components/list/Empty'
import Pagination from '../../strapi/components/list/Pagination'
import Card from '../../strapi/components/list/Card'
import { Link, useOutletContext } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { contactsSchema } from '../../config/schema/contactsSchema'
import SearchBox from '../../strapi/components/list/SearchBox'
import { datesSechema, idSchema } from '../../config/schema/filterOprators'
import { formatDateDD_MM_YYYY } from '../../strapi/utils/service'
import CreateButton from '../../components/CreateButton'

const ContactsList = () => {
    const context = useOutletContext<any>()
    const handleMapValue = (value: any) => {
        const result = value && value.map((item: any) => {
            return item?.attributes?.Name
        })

        return result.join(", ")
    };
    return (
        <StrapiList collectionName='contacts' query="populate=*" >
            <Stack mb="6">
                {/* <BreadCrumbComponent /> */}
            </Stack>
            <HStack justify="space-between" alignItems="center">
                <Heading as='h2'>{context?.title}</Heading>
                <CreateButton link="/contact/create"/>
            </HStack>
            <VStack gap="2" py={2} flexDirection={{base: "column", md: "row"}} alignItems={"flex-start"}>
                <SearchBox />
                <Stack>
                    <Filters fieldSchema={[...contactsSchema, ...idSchema, ...datesSechema]} >
                        <Button leftIcon={<AddIcon />} size="sm" variant='outline' >Add Filter</Button>
                    </Filters>
                </Stack>
            </VStack>
            <Stack border="1px solid" borderColor="gray.100" rounded="md" overflowX={"scroll"}>
                <Table whiteSpace={"nowrap"}>
                    <Thead>
                        <Tr>
                            <Th>Id</Th>
                            <Th>Name</Th>
                            <Th>Contact</Th>
                            <Th>Designation</Th>
                            <Th>Companies</Th>
                            <Th>Email</Th>
                            <Th>Created At</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Card
                        renderItem={(item) => (

                            <Tr>
                                <Td>{item?.id}</Td>
                                <Td>{item?.attributes?.Name}</Td>
                                <Td>{item?.attributes?.Phone[0]?.Number}</Td>
                                <Td>{item?.attributes?.Designation}</Td>
                                <Td>{handleMapValue(item?.attributes?.Companies?.data)}</Td>
                                <Td>{item?.attributes?.Email}</Td>
                                <Td>{formatDateDD_MM_YYYY(item?.attributes?.createdAt)}</Td>

                                <Td><Button size="sm" variant="solid" as={Link} to={`/contact/${item.id}`} >Edit</Button></Td>
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

export default ContactsList
