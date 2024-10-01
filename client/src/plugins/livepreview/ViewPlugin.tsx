import React from 'react'
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import BorderCard from '../../layout/BorderCard'
import { BiLinkExternal } from 'react-icons/bi'

const ViewPlugin = ({ studentId, route }: { studentId?: string, route?: string }) => {
    return (
        <BorderCard>
            <Box display="flex" flexDirection="column" gap="2">
                <Heading as="h4" fontSize="larger">View Resume</Heading>
                <Text fontFamily="" fontSize="medium" >View, Download or Print the resume with T&Cs for this candidate.</Text>
                <HStack>
                    <Button variant="outline" colorScheme='gray' size="md" rightIcon={<BiLinkExternal />} as={"a"} href={`#/${route}/${studentId}`} target="_blank"  >View</Button>
                </HStack>
            </Box>
        </BorderCard>
    )
}

export default ViewPlugin
