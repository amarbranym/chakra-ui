import React from 'react'
import BorderCard from '../../components/BorderCard'
import { Box, Heading, HStack, Text } from '@chakra-ui/react'
import { useStrapiFormContext } from '../../strapi/providers/StrapiFormProvider';
import { useParams } from 'react-router-dom';
import { formatDateDD_MM_YYYY } from '../../strapi/utils/service';

const CandidateInfo = () => {
    const { withoutPopulateData } = useStrapiFormContext();
    const { id } = useParams()
    console.log("in", withoutPopulateData)
    return (
        <BorderCard>
            <Box display="flex" flexDirection="column" gap="2">
                <Heading as="h4" fontSize="larger">Candidate Information </Heading>
                <HStack justify="space-between" alignItems={"center"}>
                    <Text>Candidate ID</Text>
                    <Text>#{id}</Text>
                </HStack>
                <HStack justify="space-between" alignItems={"center"}>
                    <Text>Status</Text>
                    <Text fontSize={"large"} fontWeight={"bold"} textTransform={"uppercase"} >{withoutPopulateData?.Status}</Text>
                </HStack>
                {
                    (withoutPopulateData?.Status && withoutPopulateData?.Status !== "In Process") && (
                        <>

                            <HStack justify="space-between" alignItems={"center"}>
                                <Text>Date of Activity</Text>
                                <Text>{formatDateDD_MM_YYYY(withoutPopulateData?.DateOfHiring)}</Text>
                            </HStack>
                            <HStack justify="space-between" alignItems={"center"}>
                                <Text>Company</Text>
                                <Text>{withoutPopulateData?.Company?.data?.attributes?.Name}</Text>
                            </HStack>
                            <HStack justify="space-between" alignItems={"center"}>
                                <Text>Salary</Text>
                                <Text>Rs.{withoutPopulateData?.SalaryNegotiation}/-</Text>
                            </HStack>
                        </>
                    )
                }

            </Box>
        </BorderCard>
    )
}

export default CandidateInfo
