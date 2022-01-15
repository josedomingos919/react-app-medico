import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { formatData, tableData } from "./util";

export function Requests() {
  const { requestData, setRequestData } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const getPatients = useCallback(async () => {
    setIsLoading(true);
    setRequestData([]);

    const responseData = await services.waiting.get();

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os dados!");
    else setRequestData(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setRequestData, setIsLoading]);

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return (
    <AppContent>
      <Table
        isLoading={isLoading}
        title={tableData.title}
        subTitle={tableData.subTitle}
        fields={tableData.fields}
        data={formatData(requestData)}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
