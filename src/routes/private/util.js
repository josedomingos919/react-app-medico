import { AddEmployees } from '../../pages/addEmployees'
import { AddConsultation } from '../../pages/addConsultation'
import { AddMedication } from '../../pages/addMedication'
import { AddPatient } from '../../pages/addPatient'
import { AddTreatment } from '../../pages/addTreatment'
import { PrintRequests } from '../../pages/requests/print'
import { PrintPatients } from '../../pages/patients/print'
import { PrintMedications } from '../../pages/medication/print'
import { PrintConsultation } from '../../pages/consultation/print'
import { PrintEmployees } from '../../pages/employees/print'

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
  {
    path: '/dashboard/requests/print',
    element: PrintRequests,
  },
  {
    path: '/dashboard/patients/print',
    element: PrintPatients,
  },
  {
    path: '/dashboard/medications/print',
    element: PrintMedications,
  },
  {
    path: '/dashboard/consultation/print',
    element: PrintConsultation,
  },
  {
    path: '/dashboard/employees/print',
    element: PrintEmployees,
  },
]
