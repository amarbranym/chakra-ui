import { FormData } from "./formTypes";
import moment from "moment";
const currentDate = moment().format("DD-MM-YYYY");
// console.log(currentDate);
export const paymentSchema: FormData[] = [
  {
    name: "Amount",
    type: "number",
    label: "Amount",
    required: true,
    rules: {
      min: 0,
      max: 1000000,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "PaymentType",
    type: "select",
    label: "Payment Type",
    required: true,
    rules: {
      options: [
        { label: "Registration Fees", value: "Registration Fees" },
        { label: "Providing Charges", value: "Providing Charges" },
        { label: "Salary Commission", value: "Salary Commission" },
      ],
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "PaymentMode",
    type: "select",
    label: "Payment Mode",
    required: true,
    rules: {
      options: [
        { label: "Online", value: "Online" },
        { label: "Offline", value: "Offline" },
        { label: "Check", value: "Check" },
      ],
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Status",
    type: "select",
    label: "Status",
    required: true,
    rules: {
      options: [
        { label: "Collected", value: "Collected" },
        { label: "Pending", value: "Pending" },
      ],
    },
    help: "",
    cols: 6,
    row: 1,
  },

  {
    name: "CollectionDate",
    type: "date",
    label: "Collection Date",
    required: true,
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Company",
    type: "ref:strapi",
    label: "Company",
    required:false,
    rules: {
      model: "companies",
      field: "Name",
    },
    multiple:false,
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "Candidate",
    type: "ref:strapi",
    label: "Candidate",
    required: false,
    rules: {
      model: "students",
      field: "FirstName",
    },
    multiple: false,
    help: "",
    cols: 6,
    row: 1,
  },
 
];
