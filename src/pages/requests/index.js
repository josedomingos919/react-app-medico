import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { generateCsvLink, generateXlsLink } from "../../utilities/csv";
import { containWord, getPagination } from "../../utilities/functions";
import { printPdf } from "../../utilities/pdf";
import { csvInfo, formatData, formatForCSV, tableData } from "./util";

export function Requests() {
  const { requestData, setRequestData } = useApp();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getPatients = useCallback(async () => {
    setIsLoading(true);
    setRequests([]);

    const responseData = await services.waiting.get();

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os dados!");
    else setRequests(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setRequestData, setIsLoading]);

  useEffect(() => {
    if (search) {
      setRequestData(
        getPagination({
          data: requests.filter(
            ({
              exame_id,
              status_name,
              date_start,
              user_name,
              address_name,
              preference,
              name_plan,
            }) =>
              exame_id?.toLowerCase().includes(search?.toLowerCase()) ||
              status_name?.toLowerCase().includes(search?.toLowerCase()) ||
              new Date(date_start)
                .toLocaleString()
                ?.toLowerCase()
                .includes(search?.toLowerCase()) ||
              user_name?.toLowerCase().includes(search?.toLowerCase()) ||
              address_name?.toLowerCase().includes(search?.toLowerCase()) ||
              preference?.toLowerCase().includes(search?.toLowerCase()) ||
              name_plan?.toLowerCase().includes(search?.toLowerCase())
          ),
          limit,
          page,
        })
      );
      return;
    }

    setRequestData(
      getPagination({
        data: requests,
        limit,
        page,
      })
    );
  }, [search, requests, limit, page, setRequestData]);

  useEffect(() => {
    getPatients();
  }, [getPatients]);

  return (
    <AppContent>
      <Table
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(requests),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(requests),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf("/dashboard/requests/print")}
        page={page}
        limit={limit}
        totalData={requestData?.totalData}
        totalPage={requestData?.totalPage}
        isLoading={isLoading}
        title={tableData.title}
        subTitle={tableData.subTitle}
        fields={tableData.fields}
        shortFields={tableData.shortFields}
        optios={tableData.optios}
        data={formatData(requestData?.data)}
        onChangeLimit={setLimit}
        onChangePage={setPage}
        search={search}
        setSearch={setSearch}
        setDataProp={(index, value = {}) => {
          setRequests((prev) => {
            prev[index] = { ...prev[index], ...value };
            return [...prev];
          });
        }}
      />
    </AppContent>
  );
}
