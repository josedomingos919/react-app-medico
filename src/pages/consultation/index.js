import { AppContent, Table } from "../../components";
import { tableData } from "./util";

export function Consultation() {
  return (
    <AppContent>
      <Table
        title="Consulta em lista"
        subTitle="Verificar todas as consultas"
        fields={tableData.fields}
        data={tableData.data}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
