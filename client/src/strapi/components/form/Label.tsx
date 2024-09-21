import React from "react";
import { FormLabel as Label } from "@chakra-ui/react";
interface FormLabelProps {
  name: string;
  label: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ name, label }) => {
  return (
    <Label
      htmlFor={name}
    >
      {label}
    </Label>
  );
};

export default FormLabel;
