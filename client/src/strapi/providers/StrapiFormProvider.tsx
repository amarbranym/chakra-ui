/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useStrapiContext } from './StrapiAdmin';
import { apiFetch, populateData } from '../utils/service';
import { FormData } from '../../config/schema/formTypes';
import toast from 'react-hot-toast';
interface StrapiFormContextProps {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
  handleData: any;
  handleErrors: any;
  isLoading?: boolean;
  hasAllErrors?: boolean;
  initialData: any;
  submit?: () => void;
  onSave?: () => void;
  setSchema: React.Dispatch<React.SetStateAction<any>>;
  withoutPopulateData: any

}

const StrapiFormContext = createContext<StrapiFormContextProps | undefined>(undefined);

export const StrapiFormProvider: React.FC<{
  children: (props: { submit: () => void; isLoading?: boolean, data?: any, hasAllErrors?: boolean }) => React.ReactNode;
  submit?: (result: { data: any; success: boolean }) => void;
  collectionName: string;
  slug?: string;
  query?: string;
  onSave?: (value: any) => void;
}> = ({ children, collectionName, slug, query, onSave }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialData, setInitialData] = useState<any>({});
  const [data, setData] = useState<any>({});
  const [withoutPopulateData, setWithoutPopulateData] = useState<any>({})
  const { baseURL } = useStrapiContext()

  const [hasErrors, setHasErrors] = useState<any>({})
  const [hasAllErrors, setHasAllErrors] = useState<boolean>()

  const handleData = (key: string, values: any) => {
    setData((prevData: any) => ({ ...prevData, [key]: values }));
    // setInitialData((prevData: any) => ({ ...prevData, [key]: values }));
  };

  const handleErrors = (key: string, action: number) => {
    setHasErrors({ ...hasErrors, [key]: action })
  }


  useMemo(() => {
    if (hasErrors) {
      setHasAllErrors(!Object.values(hasErrors).every(value => value === 0))
    }
  }, [hasErrors]);

  const [schemaFields, setSchemaFields] = useState<any[]>([]);

  const setSchema = (obj: any) => {
    const _arr: any[] = schemaFields;
    _arr.push(obj)
    setSchemaFields(_arr)
  }

  const handleGetDocument = async () => {
    const result = await apiFetch(baseURL +
      `/${collectionName}/${slug}?${query}`);
    if (collectionName === "users") {
      const poulateResult = populateData(schemaFields, result, collectionName);
      setInitialData(poulateResult)

    } else {
      const poulateResult = populateData(schemaFields, result?.data?.attributes);
      setWithoutPopulateData(result?.data?.attributes)
      setInitialData(poulateResult)
      setData(poulateResult);

    }
  }


  useEffect(() => {
    if (slug) {
      handleGetDocument()
    }
  }, [slug])


  const onSuccess = async (res: any, options: any = {},) => {
    const message = `${collectionName} successfully ${options?.method === "PUT" ? "updated" : "created"}`
   
    if (res?.ok) {
      if (onSave) {
        await onSave(options?.body);
      }
      toast.success(message || "");
    }
  }


  const handleSubmit = async () => {
    setIsLoading(true)
    let isValid: boolean = false
    const transformData = (schema: FormData[], name: string, data: any) => {
      const obj: any = {}
      for (let index = 0; index < schema.length; index++) {
        const field: FormData = schema[index];

        if (field.required) {
          if (!data[field?.name] || data[field?.name] === undefined || data[field?.name] === null || data[field?.name] === '') {
            isValid = true
          }
        }


        if (Object.hasOwn(data || {}, field?.name)) {
          if (field.type === "ref:strapi") {
            if (field?.multiple) {
              obj[`${field.name}`] = {
                connect: data[`${field.name}`]?.filter((value: any) => value.type !== "disconnect").map((value: any) => ({ id: value["id"] })),
                disconnect: data[`${field.name}`]?.filter((value: any) => value.type === "disconnect").map((value: any) => ({ id: value["id"] })),
              }
            }
            else {
              obj[`${field.name}`] = {
                connect: [{ id: data[`${field.name}`]?.id }],
                disconnect: []
              }
            }
          }
          else {
            obj[`${field.name}`] = data[`${field.name}`]
          }
        }
        else {

        }
      }

      return obj;
    }

    var submissionData: any = {}

    schemaFields.map((value: any) => {
      const { schema = [], name = "", type }: { schema?: FormData[], type?: string, name?: string } = value
      if (type === "RepeatableComponent") {
        var newArr: any[] = []
        data[name]?.map((value: any) => {
          newArr.push(transformData(schema, name, value))
        })
        submissionData[name] = newArr
      }
      else if (type === "Component") {
        submissionData[name] = transformData(schema, name, data[name])
      }
      else if (type === "Basic") {
        submissionData = { ...submissionData, ...transformData(schema, name, data[name]) }
      }
    });

    if (isValid === false) {
      const options = {
        method: slug ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: collectionName === "users" ? JSON.stringify(submissionData) : JSON.stringify({ data: submissionData }),
        credentials: 'include',
      };
      const url = slug ? `${collectionName}/${slug}` : `${collectionName}`
      await apiFetch(baseURL +
        `/${url}`,
        options, onSuccess
      );
      setIsLoading(false)

    } else {
      isValid = false
      setIsLoading(false)

    }
  }
  return (
    <StrapiFormContext.Provider value={{ data, initialData, setData, handleData, handleErrors, withoutPopulateData, setSchema, submit: handleSubmit, hasAllErrors }}>
      {children({ submit: handleSubmit, isLoading, data, hasAllErrors })}
    </StrapiFormContext.Provider>
  );
};

export const useStrapiFormContext = () => {
  const context = useContext(StrapiFormContext);
  if (context === undefined) {
    throw new Error('useStrapiFormContext must be used within a StrapiFormProvider');
  }
  return context;
};
