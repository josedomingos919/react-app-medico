import { useState, useMemo, useContext, createContext } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [medicineData, setMedicineData] = useState([]);

  const providerValue = useMemo(
    () => ({ medicineData, setMedicineData }),
    [medicineData, setMedicineData]
  );

  return (
    <AppContext.Provider value={providerValue}>{children}</AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
