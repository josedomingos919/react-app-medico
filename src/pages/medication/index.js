import { AppContent, Table } from "../../components";
import { tableData } from "./util";

export function Medication() {
  return (
    <AppContent>
      <Table
        title="Listas de medicação"
        subTitle="Verificar todas as medicações"
        fields={tableData.fields}
        data={tableData.data}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
