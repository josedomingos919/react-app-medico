import { AppContent, Table } from "../../components";
import { tableData } from "./util";

export function Requests() {
  return (
    <AppContent>
      <Table
        title="Listas de solicitações"
        subTitle="Verificar todas as solicitações"
        fields={tableData.fields}
        data={tableData.data}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
