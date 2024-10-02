import React from 'react'
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import BorderCard from '../../components/BorderCard'
import { BiLinkExternal } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const ViewPlugin = ({ studentId, route }: { studentId?: string, route?: string }) => {
    return (
        <BorderCard>
            <Box display="flex" flexDirection="column" gap="2">
                <Heading as="h4" fontSize="larger">View Resume</Heading>
                <Text fontFamily="" fontSize="medium" >View, Download or Print the resume with T&Cs for this candidate.</Text>
                <HStack>
                    <Button variant="outline" as={Link} colorScheme='gray' size="md" rightIcon={<BiLinkExternal />} to={`/${route}/${studentId}`}  >View</Button>
                </HStack>
            </Box>
        </BorderCard>
    )
}

export default ViewPlugin
