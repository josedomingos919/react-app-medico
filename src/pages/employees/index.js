import { AppContent, Table } from "../../components";
import { tableData } from "./util";

export function Employees() {
  return (
    <AppContent>
      <Table
        title="Todos os colaboradores cadastrados"
        fields={tableData.fields}
        data={tableData.data}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
