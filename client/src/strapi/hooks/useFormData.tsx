import React from 'react'
import { useStrapiFormContext } from '../providers/StrapiFormProvider'

export default function useFormData() {

  const {withoutPopulateData} = useStrapiFormContext()

  return withoutPopulateData
  
}
