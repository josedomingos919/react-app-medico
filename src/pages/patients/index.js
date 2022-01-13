import { useCallback, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { formatData, tableData } from "./util";

export function Patient() {
  const { patientData, setPatientData } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const getPatients = useCallback(async () => {
    setIsLoading(true);
    setPatientData([]);

    const responseData = await services.patient.get();

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os dados!");
    else setPatientData(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setPatientData, setIsLoading]);

  const handleDelete = useCallback(
    ({ user_id = "", user_name = "" }) => {
      confirmAlert({
        title: "Atenção",
        message: `Está presta a eliminar um paciente: '${user_name}' ?`,
        buttons: [
          {
            label: "Sim",
            onClick: async () => {
              const response = await services.patient.destroy({ user_id });

              if (response?.data?.success) {
                toast.success("Paciente eliminado com sucesso!");
                getPatients();
              } else {
                toast.error("Falha ao eliminar o paciente!");
              }
            },
          },
          {
            label: "Não",
          },
        ],
      });
    },
    [getPatients]
  );

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
        data={formatData(patientData)}
        optios={tableData.optios}
        onDelete={handleDelete}
      />
    </AppContent>
  );
}
