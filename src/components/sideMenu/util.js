import { Consultation } from "../../pages/consultation";
import { Dashboard } from "../../pages/dashboard";
import { Employees } from "../../pages/employees";
import { Medication } from "../../pages/medication";
import { Patient } from "../../pages/patients";
import { Requests } from "../../pages/requests";
import {
  ColaboratorIcon,
  ConsultasIcon,
  HomeIcon,
  MedicacoesIcon,
  SolicitacoesIcon,
} from "./../../assets";

export const menuData = [
  {
    path: "/dashboard/home",
    label: "Home",
    img: HomeIcon,
    element: Dashboard,
  },
  {
    path: "/dashboard/colaborators",
    label: "Colaboradores",
    img: ColaboratorIcon,
    element: Employees,
  },
  {
    path: "/dashboard/patients",
    label: "Pacientes",
    img: ColaboratorIcon,
    element: Patient,
  },
  {
    path: "/dashboard/requests",
    label: "Solicitações",
    img: SolicitacoesIcon,
    element: Requests,
  },
  {
    path: "/dashboard/consultas",
    label: "Consultas",
    img: ConsultasIcon,
    element: Consultation,
  },
  {
    path: "/dashboard/medication",
    label: "Medicações",
    img: MedicacoesIcon,
    element: Medication,
  },
];

export const isActiveRoute = (pathname) =>
  window?.location?.pathname.toLocaleLowerCase() === pathname;
