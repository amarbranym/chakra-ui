import React from 'react'
import { useStrapiListContext } from '../../providers/StrapiListProvider'
import { Button, ButtonGroup } from '@chakra-ui/react'

export default function Tabs() {

  const {query, setQuery = () => {}, currentQuery} = useStrapiListContext()

  return (
    <>
    {Array.isArray(query) ? <ButtonGroup size="sm" variant={"ghost"} colorScheme="gray">
      {query.map((item:any, index:number) => <Button variant={currentQuery === item?.query ? "solid" : "ghost"} onClick={() => {
        setQuery(item.query)
      }} key={index}>{item.title}</Button>)}
    </ButtonGroup> : 
      <></>}
    </>
  )
}
