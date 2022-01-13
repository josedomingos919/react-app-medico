import { useCallback, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { formatData, tableData } from "./util";

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

  const handleDisabled = useCallback(
    ({ user_id = "", user_name = "" }) => {
      confirmAlert({
        title: "Atenção",
        message: `Está presta a desabilitar um colaborador: '${user_name}' ?`,
        buttons: [
          {
            label: "Sim",
            onClick: async () => {
              const response = await services.doctors.disable({ user_id });

              if (response?.status === 200) {
                toast.success("Desabilitado com sucesso!");
                getEmployees();
              } else {
                toast.error("Falha ao desabilitar!");
              }
            },
          },
          {
            label: "Não",
          },
        ],
      });
    },
    [getEmployees]
  );

  useEffect(() => {
    getEmployees();
  }, [getEmployees]);

  return (
    <AppContent>
      <Table
        data={formatData(doctorsData)}
        isLoading={isLoading}
        title={tableData.title}
        fields={tableData.fields}
        optios={tableData.optios}
        onDelete={handleDisabled}
      />
    </AppContent>
  );
}
