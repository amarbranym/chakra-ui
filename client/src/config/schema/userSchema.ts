import { FormData } from "./formTypes";

export const userSchema: FormData[] = [
  {
    name: "username",
    type: "text",
    label: "User Name",
    required: true,
    help: "",
    rules: {
      min: 3,
      max: 50,
    },
    cols: 6,
    row: 1,
  },
  {
    name: "email",
    type: "text",
    label: "Email",
    required: true,
    rules: {
      min: 3,
      max: 50,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    rules: {
      min: 6,
      max: 50,
    },
    help: "",
    cols: 6,
    row: 1,
  },
  {
    name: "role",
    type: "ref:strapi",
    label: "Role",
    required: true,
    rules: {
      model: "users-permissions/roles",
      field: "type",
    },
    help: "",
    cols: 6,
    row: 1,
  },
];

export const signupSchema: FormData[] = [
  {
    name: "username",
    type: "text",
    label: "User Name",
    required: true,
    help: "",
    rules: {
      min: 3,
      max: 50,
    },
    cols: 12,
    row: 1,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    rules: {
      min: 3,
      max: 50,
    },
    help: "",
    cols: 12,
    row: 1,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    rules: {
      min: 6,
      max: 50,
    },
    help: "",
    cols: 12,
    row: 1,
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    required: true,
    rules: {
      min: 6,
      max: 50,
    },
    help: "",
    cols: 12,
    row: 1,
  },
];
export const loginSchema: FormData[] = [
  {
    name: "identifier",
    type: "email",
    label: "Email",
    required: true,
    rules: {
      min: 3,
      max: 50,
    },
    help: "",
    cols: 12,
    row: 1,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    rules: {
      min: 6,
      max: 50,
    },
    help: "",
    cols: 12,
    row: 1,
  },
];
