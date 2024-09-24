import { Stack } from '@chakra-ui/react'
import React from 'react'

const BorderCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack border="1px" py="6" px="4" borderRadius="8px" borderColor="gray.300" borderStyle="dotted" >{children}</Stack>
    )
}

export default BorderCard
