import { FormData } from "./formTypes";

export const companySchema: FormData[] = [
  {
    name: "Name",
    type: "text",
    label: "Name",
    rules: {
      min: 3,
      max: 50,
    },
    required: true,
    help: "",
    cols: 12,
    row: 1,
  },
  {
    name: "City",
    type: "ref:strapi",
    label: "City",
    required: false,

    rules: {
      model: "cities",
      field: "Name",
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Industry",
    type: "ref:strapi",
    label: "Industry",
    required: false,

    rules: {
      model: "industries",
      field: "Name",
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Address",
    type: "textarea",
    label: "Address",
    required: false,
    rules: {
      min: 3,
      max: 300,
    },
    help: "",
    cols: 12,
    row: 1,
    rows: "3",
  },
];


