import { FormData } from "./formTypes";

export const contactsSchema: FormData[] = [
  {
    name: "Name",
    type: "text",
    label: "Name",
    required: true,
    rules: {
      min: 3,
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
    rules: {
      min: 3,
      max: 80,
    },
    required:true,
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
    rules: {
      min: 3,
      max: 50,
    },
    label: "Designation",
    help: "",
    cols: 6,
    row: 1,
  },
];
