import { Stack } from '@chakra-ui/react'
import React from 'react'

const BorderCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <Stack w={"full"} borderWidth={1} py={[4, 6]} px={3} borderRadius="8px" borderColor="gray.300" borderStyle="dotted" >{children}</Stack>
    )
}

export default BorderCard
