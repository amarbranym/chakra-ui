import { FormData } from "./formTypes";

export const vacancySchema: FormData[] = [
  {
    name: "Title",
    type: "text",
    label: "Title",
    required: false,

    rules: {
      min: 0,
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
    required: true,

    rules: {
      min: 1,
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
      max: 50000,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "MaxSalary",
    type: "number",
    label: "MaxSalary",
    required: true,
    rules: {
      min: 5000,
      max: 50000,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Status",
    type: "select",
    label: "Status",
    required: false,

    rules: {
      options: [
        { label: "Open", value: "Open" },
        { label: "Closed", value: "Closed" },
        { label: "Filled", value: "Filled" },
        { label: "Interview", value: "Interview" },
        { label: "Laid Off", value: "Laid Off" },
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
    required: false,

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
    required: false,

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
    required: false,

    rules: {
      min: 0,
      max: 300,
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
    required: false,

    rules: {
      model: "students",
      field: "FirstName",
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "SalaryNegotiation",
    type: "number",
    label: "SalaryNegotiation",
    required: true,
    rules: {
      min: 5000,
      max: 50000,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Status",
    type: "select",
    label: "Status",
    required: false,

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
    required: true,
    type: "date",
    label: "DateOfHiring",
    help: "",
    cols: 6,
    row: 1,
  },
];
