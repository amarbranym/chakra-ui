import { FormData } from "./formTypes";
import { getYearOptions } from "./formUtils";

export const experienceSchema: FormData[] = [
    {
      name: "Company",
      type: "ref:strapi",
      label: "Company",
      rules: {
        model: "companies",
        field: "Name",
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "Designation",
      type: "ref:strapi",
      label: "Designation",
      rules: {
        model: "designations",
        field: "Name",
      },
      help: "",
      cols: 6,
      row: 1,
    },
  
    {
      name: "Duration",
      type: "number",
      label: "Duration",
      required: true,
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
  ];



  export const otherDetailSchema: FormData[] = [
    {
      name: "IndustriesPreference",
      type: "ref:strapi",
      label: "Industry",
      rules: {
        model: "industries",
        field: "Name",
      },
      multiple: true,
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "Skills",
      type: "ref:strapi",
      label: "Skills",
      rules: {
        model: "skills",
        field: "name",
      },
      multiple: true,
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "DOB",
      type: "date",
      label: "DOB",
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "Gender",
      type: "select",
      label: "Gender",
      rules: {
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" },
        ],
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "MaritalStatus",
      type: "select",
      label: "Marital Status",
      rules: {
        options: [
          { label: "Unmarried", value: "unmarried" },
          { label: "Married", value: "married" },
          { label: "Divorced", value: "divorced" },
        ],
      },
      help: "",
      cols: 6,
      row: 1,
    },
  ];


  export const personalSchema: FormData[] = [
    {
      name: "FirstName",
      type: "text",
      label: "First Name",
      required: true,
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
  
    {
      name: "LastName",
      type: "text",
      label: "Last Name",
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "Email",
      type: "email",
      label: "Email",
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
  
    {
      name: "FatherName",
      type: "text",
      label: "Father Name",
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
  ];

  
export const qualificationSchema: FormData[] = [
    {
      name: "school",
      type: "ref:strapi",
      label: "School",
      rules: {
        model: "schools",
        field: "Name",
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "Year",
      type: "select",
      label: "Year",
      rules: {
        options: getYearOptions(),
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "qualification",
      type: "ref:strapi",
      label: "Qualification ",
      rules: {
        model: "qualifications",
        field: "Name",
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "Score",
      type: "text",
      label: "Score ",
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 6,
      row: 1,
    },
  ];

  export const addressSchema: FormData[] = [
    {
      name: "City",
      type: "ref:strapi",
      label: "City",
      rules: {
        model: "cities",
        field: "Name",
      },
      help: "",
      cols: 6,
      row: 1,
    },
    {
      name: "AddressType",
      type: "select",
      label: "Address Type",
      rules: {
        options: [
          { value: "permanent", label: "Permanent" },
          { value: "alternate", label: "Alternate" },
        ],
      },
      help: "",
      cols: 6,
      row: 1,
        
    },
    {
      name: "Street",
      type: "textarea",
      label: "Street",
      rules: {
        min: 5,
        max: 80,
      },
      help: "",
      cols: 12,
      row: 1,
      rows: "3",
    },
  ];

