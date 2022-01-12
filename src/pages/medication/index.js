import { useCallback, useEffect, useState } from "react";
import { AppContent, Table } from "../../components";
import { services } from "../../service";
import { tableData, formatData } from "./util";
import { useApp } from "./../../context/app";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

export function Medication() {
  const { medicineData, setMedicineData } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const getMedicines = useCallback(async () => {
    setIsLoading(true);
    setMedicineData([]);

    const responseData = await services.medicine.get();

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os dados!");
    else setMedicineData(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setMedicineData, setIsLoading]);

  const handleDelete = useCallback(
    ({ id = "", medicamento = "" }) => {
      confirmAlert({
        title: "Atenção",
        message: `Está presta a eliminar a medicação: '${medicamento}' ?`,
        buttons: [
          {
            label: "Sim",
            onClick: async () => {
              const response = await services.medicine.destroy({ id });

              if (response?.status === 200) {
                toast.success("Eliminado com sucesso!");
                getMedicines();
              } else {
                toast.error("Falha ao eliminar!");
              }
            },
          },
          {
            label: "Não",
          },
        ],
      });
    },
    [getMedicines]
  );

  useEffect(() => {
    getMedicines();
  }, [getMedicines]);

  return (
    <AppContent>
      <Table
        isLoading={isLoading}
        title={tableData.title}
        subTitle={tableData.subTitle}
        fields={tableData.fields}
        data={formatData(medicineData)}
        optios={tableData.optios}
        onDelete={handleDelete}
      />
    </AppContent>
  );
}
