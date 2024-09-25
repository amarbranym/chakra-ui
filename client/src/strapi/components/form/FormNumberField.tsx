/* eslint-disable @typescript-eslint/no-explicit-any */
import { NumberInput, NumberInputField } from '@chakra-ui/react'
import { useField } from 'formik';
import React from 'react'

const FormNumberField = ({ ...props }: any) => {
    const [field, meta] = useField(props?.name);

    return (
        <NumberInput  isInvalid={meta.touched && !!meta.error} size='md' {...props} {...field}   >
            <NumberInputField  />
            {/* <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper> */}
        </NumberInput>
    )
}

export default FormNumberField
