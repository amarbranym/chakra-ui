/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Input } from '@chakra-ui/react'
import { useField } from 'formik';
import React from 'react'

const FormInput = ({ ...props }: any) => {
    const [field, meta] = useField(props?.name);

    return (
            <Input isInvalid={meta.touched && !!meta.error} size='md' {...props} {...field} />
    )
}

export default FormInput
