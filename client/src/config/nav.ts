import { BiBuilding } from "react-icons/bi";
import CompaniesList from "../views/app/CompaniesList";
import CandidatesList from "../views/app/CandidatesList";
import ContactsList from "../views/app/ContactsList";
import Users from "../views/app/Users";
import App from "../App";
import { FiHome, FiUsers } from "react-icons/fi";
import { MdOutlineContacts } from "react-icons/md";
import CandidateForm from "../views/app/CandidateForm";
import CompanyForm from "../views/app/CompanyForm";
import ContactForm from "../views/app/ContactForm";
import IndustryForm from "../views/app/IndustryForm";
import IndustriesList from "../views/app/IndustriesList";
import VacancyForm from "../views/app/VacancyForm";
import VacanciesList from "../views/app/VacanciesList";

export const nav = [
  {
    name: "Home",
    route: "/",
    component: App,
    title: "Home",
    icon: FiHome,
    isParent: true,
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
    icon: BiBuilding,
    isParent: false,
  },
  {
    name: "Company",
    route: "/company/create",
    component: CompanyForm,
    title: "Company",
    icon: BiBuilding,
    isParent: false,
  },
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
    route: "/candidates",
    component: CandidatesList,
    title: "Candidates",
    isParent: true,
    icon: BiBuilding,
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
  {
    name: "Industries",
    route: "/industries",
    component: IndustriesList,
    title: "Industries",
    isParent: true,
    icon: MdOutlineContacts,
  },
  {
    name: "Industry",
    route: "/industry/:id",
    component: IndustryForm,
    title: "Industry",
    isParent: false,
    icon: MdOutlineContacts,
  },
  {
    name: "Industry",
    route: "/industry/create",
    component: IndustryForm,
    title: "Industry",
    isParent: false,
    icon: MdOutlineContacts,
  },
  {
    name: "Vacancies",
    route: "/Vacancies",
    title: "Vacancies",
    component: VacanciesList,
    isParent: true,
    icon: MdOutlineContacts,
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
    component: Users,
    title: "Users",
    isParent: true,
    icon: FiUsers,
  },
];
