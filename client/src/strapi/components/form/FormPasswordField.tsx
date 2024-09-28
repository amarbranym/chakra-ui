import { IconButton, Input, InputGroup, InputRightElement, useDisclosure, useMergeRefs } from '@chakra-ui/react'
import { useField } from 'formik';
import React, { useRef } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const FormPasswordField = ({type, ...props }: any) => {
    const [field, meta] = useField(props?.name);

    const { isOpen, onToggle } = useDisclosure()
    const inputRef = useRef<HTMLInputElement>(null)

    const mergeRef = useMergeRefs(inputRef)
    const onClickReveal = () => {
        onToggle()
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true })
        }
    }
    return (
        <InputGroup>
            <InputRightElement>
                <IconButton
                    variant="text"
                    aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                    icon={isOpen ? <HiEyeOff /> : <HiEye />}
                    onClick={onClickReveal}
                />
            </InputRightElement>
            <Input
                isInvalid={meta.touched && !!meta.error}
                ref={mergeRef}
                type={isOpen ? 'text' : 'password'}
                autoComplete="current-password"
                {
                ...props
                }
                {
                ...field
                }
            />
        </InputGroup>
    )
}

export default FormPasswordField
