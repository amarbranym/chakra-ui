import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useStrapiListContext } from '../../providers/StrapiListProvider'

const SearchBox = () => {
    const { setSearchQuery = () => { } } = useStrapiListContext()

    return (
        <InputGroup size="sm" maxW="400px" >
            <InputLeftElement pointerEvents='none'>
                <FiSearch color='gray.300' />
            </InputLeftElement>
            <Input type='text' bg="white" rounded="4" placeholder='Search' variant="outline" size="sm" onChange={(e) => setSearchQuery(e.target.value)} />
        </InputGroup>
    )
}

export default SearchBox
