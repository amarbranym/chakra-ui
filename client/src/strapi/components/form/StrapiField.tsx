/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { useField, useFormikContext } from 'formik';
import { apiFetch } from '../../utils/service';
import { useStrapiContext } from '../../providers/StrapiAdmin';
import { Badge, Box, Button, HStack, IconButton, Input, InputGroup, InputRightElement, List, ListItem, Stack, } from '@chakra-ui/react';
import { ChevronDownIcon, SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons'


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
            setFieldValue(props.name, meta?.value)
        }
    }, [props.name, meta.value, props.multiple])



    const handleGetDocument = async () => {
        const url = `${props.rules.model}?_q=${searchValue}`;
        const data = await apiFetch(baseURL + `/${url}`);
        const options = data?.data?.map((item: any) => ({
            label: item.attributes[props.rules.field],
            value: item.attributes[props.rules.field],
            type: "connect",
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
            ? meta.value.some((val: any) => (val.value === option.value && val.type !== "disconnect"))
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
        setFieldValue(props.name, meta.value.map((val: any) => {
            if(val.id === option.id){
                return {
                    ...val,
                    type: "disconnect"
                }
            }
            else return val
        }));
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
            {
                props?.multiple && (
                    <HStack wrap="wrap" gap="2" mb='2'>
                        {
                            meta?.value?.map((tag: any, index: any) => tag.type !== "disconnect" && (
                                <Badge key={index} display="flex" gap="1" alignItems="center" >
                                    {tag.label}
                                    <IconButton aria-label='' bg="transparent" _hover={{ bg: "transparent" }} size="xs" onClick={(e) => onTagRemove(e, tag)} type="button" icon={<SmallCloseIcon />} />


                                </Badge>
                            ))
                        }
                    </HStack>
                )
            }

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
                                    <Button colorScheme='blue' leftIcon={<SmallAddIcon />} size='sm' type='button' variant="ghost" mx="auto"  >add item</Button>
                                </Stack>
                            </ListItem>
                    }
                </List>
            }
        </Box >

    )
}

export default React.memo(StrapiField)
