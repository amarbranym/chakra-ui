export interface SelectOption {
  label: string;
  value: string;
}

export interface FormData {
  name: string;
  type?:
    | "text"
    | "date"
    | "textarea"
    | "select"
    | "file"
    | "email"
    | "number"
    | "ref:strapi"
    | "tel"
    | "password";
  label?: string;
  rules?: {
    min?: number;
    max?: number;
    model?: string;
    field?: string;
    options?: SelectOption[];
  };
  multiple?: boolean;
  help?: string;
  cols?: number;
  row?: number;
  as?: string;
  rows?: string;
  required?: boolean;
}
