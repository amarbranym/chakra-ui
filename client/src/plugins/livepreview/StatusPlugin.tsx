import React from 'react'
import BorderCard from '../../layout/BorderCard'
import { Box, Button, Heading, HStack, Select, Text } from '@chakra-ui/react'

const StatusPlugin = () => {
    return (
        <BorderCard >
            <Box display="flex" flexDirection="column" gap="2">
                <Heading as="h4" fontSize="larger">Change Status</Heading>
                <Text fontFamily="" fontSize="medium" >
                    If you want to change the status for anything, you can change it using this plugin.
                </Text>
                <HStack gap="2">
                    <Select size='md' placeholder="Demo Period" _placeholder={{ color: "orange.500", fontWeight: "bold" }} colorScheme='' >
                    </Select>
                    <Button variant="solid" colorScheme='gray' size="md" >Apply</Button>
                </HStack>
            </Box>
        </BorderCard>
    )
}

export default StatusPlugin
