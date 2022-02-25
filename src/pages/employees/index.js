import { useCallback, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { generateCsvLink, generateXlsLink } from "../../utilities/csv";
import { containWord, getPagination } from "../../utilities/functions";
import { printPdf } from "../../utilities/pdf";
import { csvInfo, formatData, formatForCSV, tableData } from "./util";

export function Employees() {
  const { doctorsData, setDoctorsData } = useApp();
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getEmployees = useCallback(async () => {
    setIsLoading(true);
    setDoctors([]);

    const responseData = await services.doctors.get();

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os colaboradores!");
    else setDoctors(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setDoctors, setIsLoading]);

  useEffect(() => {
    if (search) {
      setDoctorsData(
        getPagination({
          data: doctors.filter(
            ({
              user_id,
              user_name,
              user_mail,
              user_cellphone,
              perfil_name,
              user_status,
            }) =>
              user_id?.toLowerCase().includes(search?.toLowerCase()) ||
              user_name?.toLowerCase().includes(search?.toLowerCase()) ||
              user_mail?.toLowerCase().includes(search?.toLowerCase()) ||
              user_cellphone?.toLowerCase().includes(search?.toLowerCase()) ||
              perfil_name?.toLowerCase().includes(search?.toLowerCase()) ||
              user_status?.toLowerCase().includes(search?.toLowerCase())
          ),
          limit,
          page,
        })
      );
      return;
    }

    setDoctorsData(
      getPagination({
        data: doctors,
        limit,
        page,
      })
    );
  }, [search, doctors, page, limit]);

  const handleDisabled = useCallback(
    ({ user_id = "", user_name = "", user_status = "A", ...prps }) => {
      confirmAlert({
        title: "Atenção",
        message: `Está presta a  ${
          user_status === "A" ? "desabilitar" : "habilitar"
        } um colaborador: '${user_name}' ?`,
        buttons: [
          {
            label: "Sim",
            onClick: async () => {
              const response = await services.doctors.disable({ user_id });

              if (response?.status === 200) {
                toast.success(
                  `${
                    user_status === "A" ? "Desabilitado" : "Habilitado"
                  } com sucesso!`
                );
                getEmployees();
              } else {
                toast.error("Falha!, tente novamente.");
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
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(doctors),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(doctors),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf("/dashboard/employees/print")}
        page={page}
        limit={limit}
        totalPage={doctorsData?.totalPage}
        totalData={doctorsData?.totalData}
        isLoading={isLoading}
        title={tableData.title}
        shortFields={tableData.shortFields}
        fields={tableData.fields}
        optios={tableData.optios}
        data={formatData(doctorsData?.data)}
        onDelete={handleDisabled}
        onChangeLimit={setLimit}
        onChangePage={setPage}
        search={search}
        setSearch={setSearch}
        setDataProp={(index, value = {}) => {
          setDoctors((prev) => {
            prev[index] = { ...prev[index], ...value };
            return [...prev];
          });
        }}
      />
    </AppContent>
  );
}
