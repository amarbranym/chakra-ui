import React from 'react';
// import StrapiLayout from './strapi/StrapiLayout';
import StrapiList from './strapi/components/list/StrapiList';
import Filters from './strapi/components/list/Filters';
import Empty from './strapi/components/list/Empty';
import Pagination from './strapi/components/list/Pagination';
import Card from './strapi/components/list/Card';
import { otherDetailSchema, personalSchema } from './example';
import { StrapiAdmin } from './strapi/providers/StrapiAdmin';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading, Stack, Table, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import Dashboard from './strapi/Dashboard';
const App = () => {
  return (
    <StrapiAdmin baseURL='http://localhost:1337/api' allowUser={["public"]} >
      <Dashboard>
        <StrapiList collectionName='students' query="populate=experience.Company.Contact,experience.Company.City,experience.Company.Industry,experience.Designation,Skills,qualification.school,qualification.qualification,Contacts,Address,Address.City,IndustriesPreference" >
          <Stack mb="6">
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink href='#'>Companies</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href='#'>All Companies</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Stack>
          <Heading as="h2" size="lg"  >
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
                    <Td>{item?.FirstName}{item.LastName}</Td>
                    <Td>{item.Email}</Td>
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
      </Dashboard>
    </StrapiAdmin>

  );
};

export default App;
