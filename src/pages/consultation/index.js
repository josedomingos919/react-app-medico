import { useCallback, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { AppContent, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { getPagination } from "../../utilities/functions";
import { formatData, tableData } from "./util";

export function Consultation() {
  const { medicalExameData, setMedicalExameData } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const getMedicalExames = useCallback(async () => {
    setIsLoading(true);
    setExams([]);

    const responseData = await services.exame.schedule({
      date: "2021-12-23 08:00:00",
    });

    console.log("responseData ", responseData);

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os dados!");
    else setExams(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setExams, setIsLoading]);

  useEffect(() => {
    setMedicalExameData(
      getPagination({
        data: exams,
        limit,
        page,
      })
    );
  }, [exams, limit, page]);

  useEffect(() => {
    getMedicalExames();
  }, [getMedicalExames]);

  return (
    <AppContent>
      <Table
        page={page}
        limit={limit}
        isLoading={isLoading}
        onChangeLimit={setLimit}
        onChangePage={setPage}
        totalData={medicalExameData?.totalData}
        totalPage={medicalExameData?.totalPage}
        title={tableData?.title}
        subTitle={tableData?.subTitle}
        fields={tableData.fields}
        data={formatData(medicalExameData?.data)}
        optios={tableData.optios}
      />
    </AppContent>
  );
}
