import { useCallback, useEffect, useState } from "react";
import { AppContent, Table } from "../../components";
import { services } from "../../service";
import { tableData, getEditUrl } from "./util";
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

  const handleDelete = ({ id = "", medicamento = "" }) => {
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
  };

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
        data={medicineData.map((item) => ({
          ...item,
          edit: getEditUrl(item?.id),
        }))}
        optios={tableData.optios}
        onDelete={(e) => handleDelete(e)}
      />
    </AppContent>
  );
}
