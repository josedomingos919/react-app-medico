import { AppContent, Table } from "../../components";
import { tableData } from "./util";

export function Patient() {
  return (
    <AppContent>
      <Table
        title="Pacientes"
        subTitle="Todos os pacientes cadastrados"
        fields={tableData.fields}
        data={[]}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
