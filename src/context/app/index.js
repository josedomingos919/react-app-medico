import { useState, useMemo, useContext, createContext } from "react";
import { useForm } from "react-hook-form";

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

  const registerForm = useForm();

  const providerValue = useMemo(
    () => ({
      registerForm,
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
    }),
    [
      registerForm,
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
    ]
  );

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
