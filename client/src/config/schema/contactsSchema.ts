import { FormData } from "./formTypes";

export const contactsSchema: FormData[] = [
  {
    name: "Name",
    type: "text",
    label: "Name",
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
    name: "Email",
    type: "text",
    label: "Email",
    required:true,
    rules: {
      min: 5,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Companies",
    type: "ref:strapi",
    label: "Companies",
    rules: {
      model: "companies",
      field: "Name",
    },
    help: "",
    cols: 6,
    row: 1,
    multiple:true
  },
  {
    name: "Designation",
    type: "text",
    label: "Designation",
    rules: {
      min: 5,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
];
