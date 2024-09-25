import { FormData } from "./formTypes";

export const companySchema: FormData[] = [
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
    cols: 12,
    row: 1,
  },
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
    name: "Industry",
    type: "ref:strapi",
    label: "Industry",
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


