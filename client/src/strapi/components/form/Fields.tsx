/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import StrapiField from "./StrapiField";

const Fields = ({ ...props }: any) => {
  return (
    <>
      {["text", "number", "date", "email"].includes(props?.type) && (<FormInput {...props} />)}

      {["textarea"].includes(props.type) && <FormTextarea {...props} />}

      {['select'].includes(props.type) && <FormSelect {...props} />}

      {['ref:strapi'].includes(props.type) && <StrapiField {...props} />}
    </>
  );
};

export default Fields;
