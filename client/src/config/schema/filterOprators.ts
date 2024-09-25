export const filterOprators = [
  {
    label: "Equal",
    value: "$eq",
    fieldTypes: [
      "text",
      "textarea",
      "email",
      "ref:strapi",
      "number",
      "date",
      "select",
    ],
  },
  {
    label: "Equal (case-insensitive)",
    value: "$eqi",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Not equal",
    value: "$ne",
    fieldTypes: ["text", "textarea", "email", "ref:strapi", "number", "date"],
  },
  {
    label: "Not equal (case-insensitive)",
    value: "$nei",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  { label: "Less than", value: "$lt", fieldTypes: ["number", "date"] },
  {
    label: "Less than or equal to",
    value: "$lte",
    fieldTypes: ["number", "date"],
  },
  { label: "Greater than", value: "$gt", fieldTypes: ["number", "date"] },
  {
    label: "Greater than or equal to",
    value: "$gte",
    fieldTypes: ["number", "date"],
  },
  {
    label: "Included in an array",
    value: "$in",
    fieldTypes: ["text", "textarea", "email", "ref:strapi", "number"],
  },
  {
    label: "Not included in an array",
    value: "$notIn",
    fieldTypes: ["text", "textarea", "email", "ref:strapi", "number"],
  },
  {
    label: "Contains",
    value: "$contains",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Does not contain",
    value: "$notContains",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Contains (case-insensitive)",
    value: "$containsi",
    fieldTypes: ["text", "textarea", "email", "ref:strapi", "select"],
  },
  {
    label: "Does not contain (case-insensitive)",
    value: "$notContainsi",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Is null",
    value: "$null",
    fieldTypes: [
      "text",
      "textarea",
      "email",
      "ref:strapi",
      "number",
      "date",
      "select",
    ],
  },
  {
    label: "Is not null",
    value: "$notNull",
    fieldTypes: [
      "text",
      "textarea",
      "email",
      "ref:strapi",
      "number",
      "date",
      "select",
    ],
  },
  { label: "Is between", value: "$between", fieldTypes: ["number", "date"] },
  {
    label: "Starts with",
    value: "$startsWith",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Starts with (case-insensitive)",
    value: "$startsWithi",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Ends with",
    value: "$endsWith",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
  {
    label: "Ends with (case-insensitive)",
    value: "$endsWithi",
    fieldTypes: ["text", "textarea", "email", "ref:strapi"],
  },
];