import { useState, useMemo, useContext, createContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  //list
  const [medicineData, setMedicineData] = useState({});
  const [doctorsData, setDoctorsData] = useState({});
  const [patientData, setPatientData] = useState({});
  const [requestData, setRequestData] = useState({});

  //forms
  const [medicines, setMedicines] = useState([]);
  const [teams, setTeams] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [treatment, setTreatment] = useState([{}]);
  const [treatmentError, setTreatmentError] = useState(false);

  const providerValue = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
