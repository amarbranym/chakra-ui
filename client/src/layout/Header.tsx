import { Avatar, HStack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { FiSearch } from 'react-icons/fi'

const Header = () => {
    return (
        <HStack justify='space-between'   >
            <InputGroup maxW="605px" >
                <InputLeftElement pointerEvents='none'>
                    <FiSearch color='gray.300' />
                </InputLeftElement>
                <Input type='text' bg="white" rounded="4" placeholder='Search' variant="outline" size="md" />
            </InputGroup>
            <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' size="md" />
        </HStack>
    )
}

export default Header
