import { Stack } from '@chakra-ui/react'
import React from 'react'

const BorderCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack border="1px" p="6" borderRadius="8px" borderColor="gray.300" borderStyle="dotted" >{children}</Stack>

    )
}

export default BorderCard
