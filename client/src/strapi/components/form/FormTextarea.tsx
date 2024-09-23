/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Textarea } from '@chakra-ui/react'
import { useField } from 'formik';
import React from 'react'

const FormTextarea = ({ ...props }: any) => {
    const [field, meta] = useField(props?.name);

    return (
            <Textarea  size='md' {...props} {...field} isInvalid={meta.touched && !!meta.error} />
    )
}

export default FormTextarea
