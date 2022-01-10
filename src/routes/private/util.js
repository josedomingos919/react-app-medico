import { AddEmployees } from "../../pages/addEmployees";
import { AddMedication } from "../../pages/addMedication";

export const routes = [
  {
    path: "/dashboard/colaborators/add",
    element: AddEmployees,
  },
  {
    path: "/dashboard/medication/add",
    element: AddMedication,
  },
];
