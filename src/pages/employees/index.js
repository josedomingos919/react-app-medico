import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { tableData } from "./util";

export function Employees() {
  const { doctorsData, setDoctorsData } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const getEmployees = useCallback(async () => {
    setIsLoading(true);
    setDoctorsData([]);

    const responseData = await services.doctors.get();

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os colaboradores!");
    else setDoctorsData(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setDoctorsData, setIsLoading]);

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <AppContent>
      <Table
        data={doctorsData}
        isLoading={isLoading}
        title={tableData.title}
        fields={tableData.fields}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
