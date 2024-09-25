import { FormData } from "./formTypes";

export const vacancySchema: FormData[] = [
  {
    name: "Title",
    type: "text",
    label: "Title",
    rules: {
      min: 5,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Seats",
    type: "number",
    label: "Seats",
    rules: {
      min: 5,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "MinSalary",
    type: "number",
    label: "MinSalary",
    required: true,
    rules: {
      min: 5000,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Status",
    type: "select",
    label: "Status",
    rules: {
      options: [
        { label: "Open", value: "Open" },
        { label: "Closed", value: "Closed" },
        { label: "Filled", value: "Filled" },
      ],
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
    name: "Notes",
    type: "textarea",
    label: "Notes",
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

export const candidatesSchema: FormData[] = [
  {
    name: "Student",
    type: "ref:strapi",
    label: "Student",
    rules: {
      model: "companies",
      field: "Name",
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "SalaryNegotiation",
    type: "number",
    label: "SalaryNegotiation",
    rules: {
      min: 500,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Status",
    type: "select",
    label: "Status",
    rules: {
      options: [
        { label: "Hired", value: "Hired" },
        { label: "Rejected", value: "Rejected" },
        { label: "In Probation", value: "In Probation" },
        { label: "In Process", value: "In Process" },
      ],
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "DateOfHiring",
    type: "date",
    label: "DateOfHiring",
    rules: {
      min: 500,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
];
