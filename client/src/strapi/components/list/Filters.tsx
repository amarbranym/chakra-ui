/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useStrapiListContext } from '../../providers/StrapiListProvider'
import { v4 as uuidv4 } from 'uuid';
import { Badge, Box, Button, IconButton, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Select, Stack, VStack } from '@chakra-ui/react';
// import { CloseButton, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import {
    FiPlus,
} from 'react-icons/fi'
import { filterOprators } from '../../../config/schema/filterOprators';
import { SmallCloseIcon } from '@chakra-ui/icons';
interface FiltersProps {
    fieldSchema?: any[]
}
const Filters: React.FC<FiltersProps> = ({ fieldSchema }) => {
    const { filterQuery = [], setFilterQuery = () => { } } = useStrapiListContext()
    const [selectedField, setSelectedField] = useState<any>({});

    const fields = fieldSchema?.filter((item) => ["text", "textarea", "email", "ref:strapi", "number", "date", "select", "datetime-local"].includes(item.type))
    const [queryData, setQueryData] = useState<any>({
        operatorFields: "",
        operator: "",
        owned: ""
    })


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "operatorFields") {
            setSelectedField(JSON.parse(value))
            setQueryData({ ...queryData, [name]: JSON.parse(value).name, owned: JSON.parse(value)?.rules?.field || "" })
        } else if (name === "operator") {
            setQueryData({ ...queryData, [name]: JSON.parse(value).value, "operatorName": JSON.parse(value).label })

        } else {
            setQueryData({ ...queryData, [name]: value })
        }

    };

    const handleAddFilter = () => {
        const id = uuidv4()
        if (setFilterQuery) {
            setFilterQuery([...filterQuery, { id, ...queryData }]);
        }
        setQueryData({})
    };

    const handleRemove = (id: string) => {
        setFilterQuery((prevFilterQuery: any) =>
            prevFilterQuery.filter((item: any) => item.id !== id)
        );
    };

    return (
        <Stack direction="row" gap="4" alignItems="center"   >
            <Box>
                <Popover isLazy placement='bottom-start'>
                    {
                        ({ onClose }) => (
                            <>
                                <PopoverTrigger>
                                    <Button leftIcon={<FiPlus />} size="md" variant='outline' >Add Filter</Button>
                                </PopoverTrigger>
                                <PopoverContent w="250px">
                                    <PopoverBody >
                                        <VStack >
                                            <Select size="md" name='operatorFields' onChange={handleChange} >
                                                <option disabled selected>Choose Field</option>
                                                {
                                                    fields?.map((item: any, index: number) => (
                                                        <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                                                    ))
                                                }
                                            </Select>
                                            <Select size="md" name='operator' onChange={handleChange} >
                                                <option disabled selected>Choose Operator</option>
                                                {
                                                    filterOprators?.filter(item => item?.fieldTypes?.includes(selectedField.type)).map((item: any, index: number) => (
                                                        <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                                                    ))
                                                }
                                            </Select>
                                            <>{(queryData["operator"] && queryData["operatorFields"]) && <>
                                                {
                                                    selectedField.type === "select" ? <Select size="md" name='text' onChange={handleChange} >
                                                        <option disabled selected>Choose Value</option>
                                                        {
                                                            selectedField?.rules?.options?.map((item: any, index: any) => (
                                                                <option key={index} value={item.label}>{item.label}</option>
                                                            ))
                                                        }
                                                    </Select> : (selectedField.type === "date") ? <Input size="md" name='date' type={selectedField.type || "date"} onChange={handleChange}></Input> : <Input size='md' name='text' onChange={handleChange} type={["text", "ref:strapi", "email", "textareat"].includes(selectedField.type) ? "text" : selectedField.type} />
                                                }
                                            </>}</>
                                            {(queryData["operator"] && queryData["operatorFields"] && (queryData?.text || queryData?.date)) &&
                                                <Button size="md" w="full" variant="outline" colorScheme='blue' onClick={() => {
                                                    handleAddFilter();
                                                    onClose();
                                                }} leftIcon={<FiPlus />}  >Add</Button>
                                            }
                                        </VStack>

                                    </PopoverBody>
                                </PopoverContent>
                            </>
                        )
                    }

                </Popover>
            </Box>
            <Box display="flex" gap="4">
                {
                    filterQuery.map((item: any, index: number) => (
                        <Badge colorScheme='blue' variant="outline" display="flex" gap="2" alignItems={"center"} px="2" py={"1"} rounded="md" textTransform="capitalize" fontSize={"small"} key={item.id || index} >{`${item.operatorFields} ${item.operatorName} ${item.text}`}  <IconButton aria-label='' colorScheme='gray' variant={"ghost"} size="sm" type="button" icon={<SmallCloseIcon />} onClick={() => handleRemove(item.id)} /></Badge>
                    ))
                }
            </Box>
        </Stack >
    )
}

export default Filters
