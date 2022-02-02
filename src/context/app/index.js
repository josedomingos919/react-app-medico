import { useState, useMemo, useContext, createContext } from 'react'

const AppContext = createContext()

export function AppProvider({ children }) {
  //list
  const [medicineData, setMedicineData] = useState({})
  const [doctorsData, setDoctorsData] = useState({})
  const [patientData, setPatientData] = useState({})
  const [requestData, setRequestData] = useState({})
  const [medicalExameData, setMedicalExameData] = useState({})

  //forms
  const [statusData, setStatusData] = useState([])
  const [medicines, setMedicines] = useState([])
  const [teams, setTeams] = useState([])
  const [doctors, setDoctors] = useState([])
  const [treatment, setTreatment] = useState([{}])
  const [treatmentError, setTreatmentError] = useState(false)

  const providerValue = useMemo(
    () => ({
      statusData,
      setStatusData,
      treatment,
      setTreatment,
      doctors,
      setDoctors,
      medicines,
      setMedicines,
      medicineData,
      setMedicineData,
      doctorsData,
      setDoctorsData,
      patientData,
      setPatientData,
      requestData,
      setRequestData,
      teams,
      setTeams,
      treatmentError,
      setTreatmentError,
      medicalExameData,
      setMedicalExameData,
    }),
    [
      statusData,
      setStatusData,
      treatment,
      setTreatment,
      doctors,
      setDoctors,
      teams,
      setTeams,
      medicineData,
      setMedicineData,
      doctorsData,
      setDoctorsData,
      patientData,
      setPatientData,
      requestData,
      setRequestData,
      medicines,
      setMedicines,
      treatmentError,
      setTreatmentError,
      medicalExameData,
      setMedicalExameData,
    ],
  )

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
