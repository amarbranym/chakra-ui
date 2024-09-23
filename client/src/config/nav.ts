import { BiBuilding } from "react-icons/bi";
import Companies from "../views/app/Companies";
import Resume from "../views/app/Resume";
import Contacts from "../views/app/Contacts";
import Users from "../views/app/Users";
import App from "../App";
import { FiHome, FiUsers } from "react-icons/fi";
import { MdOutlineContacts } from "react-icons/md";
import CompanyForm from "../views/app/CompanyForm";

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
    component: Companies,
    title: "Companies",
    icon: BiBuilding,
    isParent: true,
  },
  {
    name: "Company",
    route: "/company/:id",
    component:CompanyForm ,
    title: "Company",
    isParent: false,
  },
  {
    name: "Resume",
    route: "/resume",
    component: Resume,
    title: "Resume",
    isParent: true,
    icon: BiBuilding,
  },
  {
    name: "Contacts",
    route: "/contacts",
    component: Contacts,
    title: "Contact",
    isParent: true,
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
