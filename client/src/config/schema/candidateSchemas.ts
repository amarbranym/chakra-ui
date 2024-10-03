import { FormData } from "./formTypes";
import { getYearOptions } from "./formUtils";

export const statusSchema: FormData[] = [
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
    name: "SalaryNegotiation",
    type: "number",
    label: "SalaryNegotiation",
    required: false,
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
        { label: "Interview ", value: "Interview " },
        { label: "Laid off ", value: "Laid off" },
      ],
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "DateOfHiring",
    required: false,
    type: "date",
    label: "DateOfHiring",
    help: "",
    cols: 6,
    row: 1,
  },
]

export const interviewSchema: FormData[] = [
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
    cols: 12,
    row: 1,
  },
  {
    name: "DateOfInterview",
    required: true,
    type: "date",
    label: "Date of Interview",
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Result",
    type: "select",
    label: "Status",
    required: true,

    rules: {
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Selected ", value: "Selected" },
        { label: "Rejected ", value: "Rejected" },
      ],
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
]

export const experienceSchema: FormData[] = [
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
    name: "Designation",
    type: "ref:strapi",
    label: "Designation",
    required: false,

    rules: {
      model: "designations",
      field: "Name",
      max: 12,
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
      min: 0,
      max: 180,
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
    required: false,

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
    required: false,

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
    required: true,
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Gender",
    type: "select",
    label: "Gender",
    required: true,
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
    required: true,
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
  {
    name: "Hobbies",
    type: "text",
    label: "Hobbies",
    rules: {
      min: 0,
      max: 50,
    },
    required: false,
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
    rules: {
      min: 3,
      max: 50,
    },
    required: true,
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "LastName",
    type: "text",
    label: "Last Name",
    required: false,
    rules: {
      min: 0,
      max: 50,
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
      min: 0,
      max: 50,
    },
    required: false,
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "FatherName",
    type: "text",
    label: "Father Name",
    rules: {
      min: 0,
      max: 50,
    },
    required: true,

    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "CandidateType",
    type: "select",
    label: "Candidate Type",
    required: true,
    rules: {
      options: [
        { label: "Labour", value: "Labour" },
        { label: "White Collar", value: "White Collar" },
        { label: "Blue Collar", value: "Blue Collar" },
      ],
    },
    value: "Blue Collar",
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
    required: false,

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
    required: false,

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
    required: false,

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
    required: false,
    rules: {
      min: 0,
      max: 10,
    },
    label: "Score ",
    help: "",
    cols: 6,
    row: 1,
  },
];

export const addressSchema: FormData[] = [
  {
    name: "AddressType",
    type: "select",
    required: true,
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
    name: "City",
    type: "ref:strapi",
    label: "City",
    required: true,
    rules: {
      model: "cities",
      field: "Name",
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Street",
    type: "textarea",
    required: false,
    rules: {
      min: 0,
      max: 300,
    },
    label: "Street",
    help: "",
    cols: 12,
    row: 1,
    rows: "3",
  },
];
