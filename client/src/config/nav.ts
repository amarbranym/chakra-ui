import { BiBuilding } from "react-icons/bi";
import CompaniesList from "../views/app/CompaniesList";
import CandidatesList from "../views/app/CandidatesList";
import ContactsList from "../views/app/ContactsList";
import App from "../App";
import { FiHome, FiUsers } from "react-icons/fi";
import { PiStudent } from "react-icons/pi";
import { MdOutlineContacts } from "react-icons/md";
import CandidateForm from "../views/app/CandidateForm";
import CompanyForm from "../views/app/CompanyForm";
import ContactForm from "../views/app/ContactForm";
import IndustryForm from "../views/app/IndustryForm";
import IndustriesList from "../views/app/IndustriesList";
import VacancyForm from "../views/app/VacancyForm";
import VacanciesList from "../views/app/VacanciesList";
import UsersList from "../views/app/UsersList";
import UserForm from "../views/app/UserForm";
import { LiaIndustrySolid } from "react-icons/lia";
import { TbDeviceTabletSearch } from "react-icons/tb";
export const nav = [
  // {
  //   name: "Home",
  //   route: "/",
  //   component: App,
  //   title: "Home",
  //   icon: FiHome,
  //   isParent: false,
  // },
  {
    name: "Candidate",
    route: "/candidate/:id",
    component: CandidateForm,
    title: "Candidate",
    isParent: false,
  },
  {
    name: "Candidate",
    route: "/candidate/create",
    component: CandidateForm,
    title: "Candidate",
    isParent: false,
  },
  {
    name: "Candidates",
    route: "/",
    component: CandidatesList,
    title: "Candidates",
    isParent: true,
    icon: PiStudent,
  },
  {
    name: "Companies",
    route: "/companies",
    component: CompaniesList,
    title: "Companies",
    icon: BiBuilding,
    isParent: true,
  },
  {
    name: "Company",
    route: "/company/:id",
    component: CompanyForm,
    title: "Company",
    isParent: false,
  },
  {
    name: "Company",
    route: "/company/create",
    component: CompanyForm,
    title: "Company",
    isParent: false,
  },
  
  {
    name: "Contacts",
    route: "/contacts",
    component: ContactsList,
    title: "Contact",
    isParent: true,
    icon: MdOutlineContacts,
  },
  {
    name: "Contact",
    route: "/contact/:id",
    component: ContactForm,
    title: "Contact",
    isParent: false,
    icon: MdOutlineContacts,
  },
  {
    name: "Contact",
    route: "/contact/create",
    component: ContactForm,
    title: "Contact",
    isParent: false,
    icon: MdOutlineContacts,
  },
  // {
  //   name: "Industries",
  //   route: "/industries",
  //   component: IndustriesList,
  //   title: "Industries",
  //   isParent: true,
  //   icon: LiaIndustrySolid,
  // },
  // {
  //   name: "Industry",
  //   route: "/industry/:id",
  //   component: IndustryForm,
  //   title: "Industry",
  //   isParent: false,
  //   icon: MdOutlineContacts,
  // },
  // {
  //   name: "Industry",
  //   route: "/industry/create",
  //   component: IndustryForm,
  //   title: "Industry",
  //   isParent: false,
  //   icon: MdOutlineContacts,
  // },
  {
    name: "Vacancies",
    route: "/Vacancies",
    title: "Vacancies",
    component: VacanciesList,
    isParent: true,
    icon: TbDeviceTabletSearch,
  },
  {
    name: "Vacancy",
    route: "/vacancy/:id",
    title: "Vacancy",
    component: VacancyForm,
    isParent: false,
    icon: MdOutlineContacts,
  },
  {
    name: "Vacancy",
    route: "/vacancy/create",
    title: "Vacancy",
    component: VacancyForm,
    isParent: false,
    icon: MdOutlineContacts,
  },
  {
    name: "Users",
    route: "/users",
    component: UsersList,
    title: "Users",
    isParent: true,
    icon: FiUsers,
  },
  {
    name: "User",
    route: "/user/:id",
    component: UserForm,
    title: "User",
    isParent: false,
  },
  {
    name: "User",
    route: "/user/create",
    component: UserForm,
    title: "User",
    isParent: false,
  },
 
];
