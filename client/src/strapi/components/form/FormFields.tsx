/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormControl, FormErrorMessage, FormLabel, GridItem } from "@chakra-ui/react";
import Fields from "./Fields";
import { useField } from "formik";

interface Props {
    label: string;
    name: string;
    cols: number;
    row: number;
}

const FormFields: React.FC<Props> = ({ ...props }: any) => {
    const [field, meta] = useField(props?.name);
    return (
        <GridItem colSpan={props?.cols} rowSpan={props?.row} >
            <FormControl isInvalid={meta.touched && !!meta.error} isRequired={props?.required}>
                <FormLabel htmlFor={props?.name}>{props?.label}</FormLabel>
                <Fields  {...props} />
                {meta?.touched && meta?.error && (
                    <FormErrorMessage>{meta?.error}</FormErrorMessage>
                )}
            </FormControl>
        </GridItem>

    );
};

export default FormFields;
