import { AddEmployees } from '../../pages/addEmployees'
import { AddConsultation } from '../../pages/addConsultation'
import { AddMedication } from '../../pages/addMedication'
import { AddPatient } from '../../pages/addPatient'
import { AddTreatment } from '../../pages/addTreatment'

export const routes = [
  {
    path: '/dashboard/colaborators/add',
    element: AddEmployees,
  },
  {
    path: '/dashboard/colaborators/add/:id',
    element: AddEmployees,
  },
  {
    path: '/dashboard/medication/add/:id',
    element: AddMedication,
  },
  {
    path: '/dashboard/medication/add',
    element: AddMedication,
  },
  {
    path: '/dashboard/patient/add',
    element: AddPatient,
  },
  {
    path: '/dashboard/patients/add/:id',
    element: AddPatient,
  },
  {
    path: '/dashboard/treatment/add/:id',
    element: AddTreatment,
  },
  {
    path: '/dashboard/consultation/add',
    element: AddConsultation,
  },
]
