import { AddIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateButton({
  link
}:{
  link: string
}) {
  return (
    <>
      <Button 
        as={Link} 
        display={{base: "none", md:"flex"}}
        variant="outline" 
        colorScheme='gray' 
        size="sm" 
        leftIcon={<AddIcon />} 
        to={link} 
      >
        Create
      </Button>
      <IconButton
        as={Link} 
        aria-label='Create'
        colorScheme='blackAlpha'
        display={{base: "flex", md:"none"}}
        bg="black"
        size="lg"
        rounded={"full"}
        zIndex={500}
        position={'fixed'}
        bottom={4}
        right={4}
        to={link} 
      >
        <AddIcon/>
      </IconButton>
    </>
  )
}
