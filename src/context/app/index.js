import { useState, useMemo, useContext, createContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [medicineData, setMedicineData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);

  const providerValue = useMemo(
    () => ({ medicineData, setMedicineData, doctorsData, setDoctorsData }),
    [medicineData, setMedicineData, doctorsData, setDoctorsData]
  );

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
