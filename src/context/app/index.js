import { useState, useMemo, useContext, createContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [medicineData, setMedicineData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [patientData, setPatientData] = useState([]);
  const [requestData, setRequestData] = useState([]);

  const providerValue = useMemo(
    () => ({
      medicineData,
      setMedicineData,
      doctorsData,
      setDoctorsData,
      patientData,
      setPatientData,
      requestData,
      setRequestData,
    }),
    [
      medicineData,
      setMedicineData,
      doctorsData,
      setDoctorsData,
      patientData,
      setPatientData,
      requestData,
      setRequestData,
    ]
  );

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
