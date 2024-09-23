/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { useField, useFormikContext } from 'formik';
import { apiFetch } from '../../utils/service';
import { useStrapiContext } from '../../providers/StrapiAdmin';
import { Box, Button, Input, InputGroup, InputRightElement, List, ListItem, Stack, } from '@chakra-ui/react';
import { ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons'


const StrapiField = ({ ...props }: any) => {
    const [field, meta] = useField(props.name)
    const { setFieldValue } = useFormikContext<any>();
    const { baseURL } = useStrapiContext()
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [values, setValues] = useState<any[]>([]);

    useEffect(() => {
        setFieldValue(props.name, props?.multiple ? [] : null);
    }, [])

    useEffect(() => {
        if (meta.value) {
            if (!props.multiple) {
                setSearchValue(meta?.value.label)
            }
        }
    }, [props.name, meta.value, props.multiple])



    const handleGetDocument = async () => {
        const url = `${props.rules.model}?_q=${searchValue}`;
        const data = await apiFetch(baseURL + `/${url}`);
        const options = data?.data?.map((item: any) => ({
            label: item.attributes[props.rules.field],
            value: item.attributes[props.rules.field],
            id: item.id
        })) || [];
        setValues(options);
    }

    useEffect(() => {
        handleGetDocument()
    }, [searchValue]);

    const inputRef = useRef<any>(null);

    const handleInputClick = () => {
        setShowMenu(prev => !prev);
    };

    useEffect(() => {
        const handler = (e: any) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    }, []);

    const isSelected = (option: any) => {
        if (!meta.value) return false;
        return props?.multiple
            ? meta.value.some((val: any) => val.value === option.value)
            : meta.value.value === option.value;
    };

    const onItemClick = (option: any) => {
        let newValue;
        if (props?.multiple) {
            if (meta.value.some((val: any) => val.id === option.id)) {
                setShowMenu(false)
                return; // Do nothing if the option is already selected
            } else {
                newValue = [...meta.value, option];
            }
        } else {
            newValue = option;
        }

        setFieldValue(props.name, newValue);
        setSearchValue(props?.multiple ? "" : option.label);
        setShowMenu(false);
    };

    const onTagRemove = (e: any, option: any) => {
        e.stopPropagation();
        setFieldValue(props.name, meta.value.filter((val: any) => val.id !== option.id));
    };

    const handleSave = async () => {
        const payload = { [props.rules.field]: searchValue }


        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: payload }),
            credentials: 'include',
        };
        await apiFetch(baseURL + `/${props.rules.model}`, options)
        // await createDocumentOption({
        //     data: { [props.rules.field]: searchValue },
        //     model: props.rules.model
        // });
    };

    return (
        <Box ref={inputRef} position='relative' >
            {/* {
                props?.multiple && (
                    <div className='flex gap-2 mb-2 flex-wrap'>
                        {
                            meta?.value?.map((tag: any, index: any) => (
                                <span key={index} className="inline-flex items-center gap-x-0.5 rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                    {tag.label}
                                    <button onClick={(e) => onTagRemove(e, tag)} type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                                        <span className="sr-only">Remove</span>
                                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-600/50 group-hover:stroke-gray-600/75">
                                            <path d="M4 4l6 6m0-6l-6 6" />
                                        </svg>
                                        <span className="absolute -inset-1" />
                                    </button>
                                </span>
                            ))
                        }
                    </div>
                )
            } */}

            <InputGroup onClick={handleInputClick}>
                <Input
                    size="md"
                    {...field}
                    type="text"
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <InputRightElement>
                    <ChevronDownIcon color='gray.500' />
                </InputRightElement>

            </InputGroup>
            {
                showMenu &&
                <List maxH={"20rem"} bg="white" rounded="8px" position="absolute" w='full' zIndex={11} shadow="md" mt="2" overflowX="auto" >
                    {
                        values?.length > 0 ? values?.map((item: any, index: any) => (
                            <ListItem px={{ base: "6" }} py={{ base: "2" }} _hover={{ bg: "gray.200" }} bg={isSelected(item) && "gray.200"} key={index + 1} onClick={() => onItemClick(item)}>{item.label}</ListItem>

                        )) :
                            <ListItem py={{ base: "2" }} onClick={handleSave}  >
                                <Stack>
                                    <Button colorScheme='blue'  leftIcon={<SmallAddIcon />} size='sm' type='button' variant="ghost" mx="auto"  >add item</Button>
                                </Stack>
                            </ListItem>
                    }
                </List>
            }
        </Box >

    )
}

export default React.memo(StrapiField)
