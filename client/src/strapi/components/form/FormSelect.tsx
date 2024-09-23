/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from '@chakra-ui/react';
import { useField, useFormikContext } from 'formik';
import React from 'react'

const FormSelect = ({ ...props }: any) => {
    const [field, meta] = useField(props.name);
    const { setFieldValue } = useFormikContext<any>();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        if (selectedValue === "Choose here") {
            setFieldValue(props.name, '');
        } else {
            setFieldValue(props.name, selectedValue);
        }
    };

    return (
        <Select
            size="md"
            {
            ...props
            }
            {
            ...field
            }
            onChange={handleChange}
            isInvalid={meta.touched && !!meta.error}
        >
            <option disabled selected>Choose here</option>
            {
                props?.rules?.options?.map((item: any) => (
                    <option key={item.value}>{item.label}</option>
                ))
            }
        </Select>
    )
}

export default FormSelect
