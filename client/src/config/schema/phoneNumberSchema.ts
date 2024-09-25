import { FormData } from "./formTypes";

export const phoneNumberSchema: FormData[] = [
  {
    name: "CountryCode",
    type: "select",
    label: "Country Code",
    required: true,
    rules: {
      options: [
        { value: "USA (+1)", label: "USA (+1)" },
        { value: "India (+91)", label: "India (+91)" },
        { value: "UK (+44)", label: "UK(+44)" },
        { value: "Australia (+61)", label: "Australia (+61)" },
        { value: "Japan (+81)", label: "Japan (+81)" },
        { value: "Germany (+49)", label: "Germany (+49)" },
        { value: "France (+33)", label: "France (+33)" },
        { value: "China (+86)", label: "China (+86)" },
        { value: "Italy (+39)", label: "Italy (+39)" },
        { value: "Russia (+7)", label: "Russia (+7)" },
      ],
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Number",
    type: "text",
    label: "Number",
    rules: {
      min: 5,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Type",
    type: "select",
    label: "Type",

    rules: {
      options: [
        { value: "primary", label: "Primary" },
        { value: "alternate", label: "Alternate" },
        { value: "work", label: "Work" },
        { value: "home", label: "Home" },
      ],
    },
    help: "",
    cols: 12,
    row: 1,
  },
];
