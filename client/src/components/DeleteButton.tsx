import { DeleteIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function DeleteButton({onClick = () => {}}:any) {

  const [loading, setLoad] = useState(false)

  return (
    <Button 
        variant="outline" 
        colorScheme='red' 
        size="sm" 
        isLoading={loading}
        onClick={() => {
          setLoad(true)
          onClick()
        }}
        leftIcon={<DeleteIcon />} 
      >
        Delete
    </Button>
  )
}
