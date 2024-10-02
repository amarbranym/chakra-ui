/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import BorderCard from '../../components/BorderCard'

const RegistrationPlugin = () => {

  return (
    <BorderCard>
      <Box display="flex" flexDirection="column" gap="2">
        <Heading as="h4" fontSize="larger">Pay Registration</Heading>
        <Text fontFamily="" fontSize="medium" >Pay Rs. 500/- for this candidate, if already paid please ignore.</Text>
        <HStack>
          <Button as={"a"} variant="outline" colorScheme='purple' size="md" target='_blank'   >Pay Now</Button>
        </HStack>
      </Box>
    </BorderCard>
  )
}

export default RegistrationPlugin
