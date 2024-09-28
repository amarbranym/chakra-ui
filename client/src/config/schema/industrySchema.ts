import { FormData } from "./formTypes";

export const industrySchema: FormData[] = [
  {
    name: "Name",
    type: "text",
    label: "Name",
    required: true,
    rules: {
      min: 2,
      max: 80,
    },
    help: "",
    cols: 6,
    row: 1,
  },
];
