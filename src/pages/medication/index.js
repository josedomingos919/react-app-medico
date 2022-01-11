import { useCallback, useEffect, useState } from "react";
import { AppContent, Table } from "../../components";
import { services } from "../../service";
import { tableData } from "./util";
import { useApp } from "./../../context/app";
import { toast } from "react-toastify";

export function Medication() {
  const { medicineData, setMedicineData } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const getMedicines = useCallback(async () => {
    setIsLoading(true);
    const responseData = await services.medicine.get();

    if (!responseData?.data?.success) {
      toast.error("Falha ao carregar os dados!");
    } else {
      setMedicineData(responseData?.data);
    }

    console.log("responseData=> ", responseData);
    setIsLoading(false);
  }, [setMedicineData, setIsLoading]);

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  return (
    <AppContent>
      <Table
        isLoading={isLoading}
        title="Listas de medicação"
        subTitle="Verificar todas as medicações"
        fields={tableData.fields}
        data={medicineData}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
