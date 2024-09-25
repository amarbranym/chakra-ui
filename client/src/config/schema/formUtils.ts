import moment from "moment";
import { SelectOption } from "./formTypes";

export const getYearOptions = (): SelectOption[] => {
  const startYear = 2000;
  const currentYear = moment().year();
  const yearOptions: SelectOption[] = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearOptions.push({ label: `y${year}`, value: `y${year}` });
  }

  return yearOptions;
};
