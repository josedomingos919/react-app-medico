import { useCallback, useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { AppContent, Loader, Table } from "../../components";
import { useApp } from "../../context/app";
import { services } from "../../service";
import { generateCsvLink, generateXlsLink } from "../../utilities/csv";
import {
  containWord,
  getPagination,
  getSelectData,
  isEmpty,
} from "../../utilities/functions";
import { printPdf } from "../../utilities/pdf";
import {
  csvInfo,
  formatData,
  formatForCSV,
  initialFormData,
  tableData,
} from "./util";

import Select from "react-select";

export function Consultation() {
  const openModalRef = useRef();
  const buttonCloseRef = useRef();

  const {
    medicalExameData,
    setMedicalExameData,
    setMedicines,
    setTeams,
    setDoctors,
    medicines = [],
    teams = [],
    doctors = [],
    statusData = [],
    setStatusData,
  } = useApp();

  const [isLoadingUpdate, setIsloadingUpdate] = useState(false);
  const [validate, setValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState();

  const [formData, __setFormData] = useState({ ...initialFormData });
  const setFormData = (key = "", val) =>
    __setFormData((prevState) => ({ ...prevState, [key]: val }));

  const getMedicalExames = useCallback(async () => {
    setIsLoading(true);
    setExams([]);

    const responseData = await services.exame.schedule({
      date: "",
    });

    if (!responseData?.data?.success)
      toast.error("Falha ao carregar os dados!");
    else setExams(responseData?.data?.payload ?? []);

    setIsLoading(false);
  }, [setExams, setIsLoading]);

  useEffect(() => {
    if (search) {
      setMedicalExameData(
        getPagination({
          data: exams.filter(
            ({
              exame_id,
              patient_name,
              equipe_name,
              date_input,
              medicamento,
              status_name,
            }) =>
              exame_id?.toLowerCase().includes(search?.toLowerCase()) ||
              patient_name?.toLowerCase().includes(search?.toLowerCase()) ||
              equipe_name?.toLowerCase().includes(search?.toLowerCase()) ||
              new Date(date_input)
                .toLocaleString()
                ?.toLowerCase()
                .includes(search?.toLowerCase()) ||
              medicamento?.toLowerCase().includes(search?.toLowerCase()) ||
              status_name?.toLowerCase().includes(search?.toLowerCase())
          ),
          limit,
          page,
        })
      );

      return;
    }

    setMedicalExameData(
      getPagination({
        data: exams,
        limit,
        page,
      })
    );
  }, [search, exams, limit, page, setMedicalExameData]);

  useEffect(() => {
    getMedicalExames();
  }, [getMedicalExames]);

  const getMedicines = useCallback(async () => {
    const response = await services.medicine.get();
    if (response?.data?.success) setMedicines(response.data.payload ?? []);
    else toast.error("Falha ao carregar os medicamentos!");
  }, [setMedicines]);

  const getTeam = useCallback(async () => {
    const response = await services.waiting.getTeam();
    if (response?.data?.success) setTeams(response.data.payload ?? []);
    else toast.error("Falha ao carregar a equipe!");
  }, [setTeams]);

  const getDoctors = useCallback(async () => {
    const response = await services.waiting.getDoctors();

    if (response?.data?.success) setDoctors(response.data.payload ?? []);
    else toast.error("Falha ao carregar os médicos plantonista!");
  }, [setDoctors]);

  const getStatus = useCallback(async () => {
    const response = await services.exame.getStatus();

    if (response?.data?.success) setStatusData(response.data.payload ?? []);
    else toast.error("Falha ao carregar os estados!");
  }, [setDoctors]);

  useEffect(() => {
    getStatus();
    getTeam();
    getDoctors();
    getMedicines();
  }, [getMedicines, getDoctors, getTeam]);

  const handleUpdate = async () => {
    setValidate(true);

    const { date_input, doctor_id, medicine_id, equipe_id, status_id } =
      formData;

    if (
      !date_input ||
      !doctor_id?.value ||
      !medicine_id?.value ||
      !equipe_id?.value ||
      !status_id?.value
    )
      return;

    const data = {
      date_input,
      equipe_id: equipe_id?.value,
      doctor_id: doctor_id?.value,
      status_id: status_id?.value,
      medicine_id: medicine_id?.value,
      treatment_id: selectedItem?.treatment_id,
    };

    setIsloadingUpdate(true);
    const response = await services.exame.update(data);
    setIsloadingUpdate(false);

    if (response?.data?.success) {
      toast.success("Consulta atualizada com sucesso!");
      getMedicalExames();
      buttonCloseRef.current.click();
    } else toast.error("Falha ao atualizar consulta!");
  };

  const renderUpdateModal = () => {
    return (
      <>
        <button
          ref={openModalRef}
          hidden={true}
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Launch demo modal
        </button>

        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Editar Consulta ID: ( {selectedItem?.treatment_id} )
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className="col-12 mb-5">
                  <div className="row mb-3">
                    <div className="col-6">
                      <h2 className="green-text mb-2">Horários</h2>
                      <input
                        disabled={isLoadingUpdate}
                        className="registerInput"
                        max="9999-12-31T23:59"
                        type="datetime-local"
                        value={formData?.date_input}
                        onChange={(e) =>
                          setFormData("date_input", e?.target?.value)
                        }
                      />
                      <span className="span-error">
                        {validate &&
                          !formData?.date_input &&
                          "*Campo obrigatório!"}
                      </span>
                    </div>
                    <div className="col-6">
                      <h2 className="green-text mb-2">Equipe</h2>
                      <Select
                        disabled={isLoadingUpdate}
                        value={formData?.equipe_id}
                        onChange={(val) => setFormData("equipe_id", val)}
                        isDisabled={isEmpty(teams)}
                        options={getSelectData({
                          data: teams,
                          labelKey: "user_name",
                          valueKey: "user_id",
                        })}
                      />

                      <span className="span-error">
                        {validate &&
                          !formData?.equipe_id?.value &&
                          "*Campo obrigatório!"}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <h2 className="green-text mb-2">Médico Platonista</h2>
                      <Select
                        disabled={isLoadingUpdate}
                        value={formData?.doctor_id}
                        onChange={(val) => setFormData("doctor_id", val)}
                        isDisabled={isEmpty(doctors)}
                        options={getSelectData({
                          data: doctors,
                          labelKey: "user_name",
                          valueKey: "user_id",
                        })}
                      />
                      <span className="span-error">
                        {validate &&
                          !formData?.doctor_id?.value &&
                          "*Campo obrigatório!"}
                      </span>
                    </div>
                    <div className="col-6">
                      <h2 className="green-text mb-2">Medicação</h2>
                      <Select
                        disabled={isLoadingUpdate}
                        value={formData?.medicine_id}
                        onChange={(val) => setFormData("medicine_id", val)}
                        isDisabled={isEmpty(medicines)}
                        options={getSelectData({
                          data: medicines,
                          labelKey: "medicamento",
                        })}
                      />
                      <span className="span-error">
                        {validate &&
                          !formData?.medicine_id?.value &&
                          "*Campo obrigatório!"}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <h2 className="green-text">Estado</h2>
                      <Select
                        disabled={isLoadingUpdate}
                        value={formData?.status_id}
                        onChange={(val) => setFormData("status_id", val)}
                        isDisabled={isEmpty(medicines)}
                        options={getSelectData({
                          data: statusData,
                          labelKey: "status_name",
                          valueKey: "id",
                        })}
                      />
                      <span className="span-error">
                        {validate &&
                          !formData?.medicine_id?.value &&
                          "*Campo obrigatório!"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  ref={buttonCloseRef}
                  type="button"
                  class="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  disabled={isLoadingUpdate}
                  onClick={handleUpdate}
                  type="button"
                  class="btn btn-success"
                >
                  {isLoadingUpdate ? <Loader /> : "Salvar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <AppContent>
      <Table
        onExportCSV={() =>
          generateCsvLink({
            data: formatForCSV(exams),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportXLS={() =>
          generateXlsLink({
            data: formatForCSV(exams),
            header: csvInfo.header,
            name: csvInfo.name,
          })
        }
        onExportPDF={() => printPdf("/dashboard/consultation/print")}
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
        shortFields={tableData.shortFields}
        data={formatData(medicalExameData?.data)}
        optios={tableData.optios}
        search={search}
        setSearch={setSearch}
        onEdit={(item) => {
          const {
            date_input,
            equipe_name,
            doctor_name,
            medicamento,
            status_name_clone,
          } = item;

          setValidate(false);

          const [day, month, year_and_hour] = date_input.split("/");
          const [year, full_time] = year_and_hour.split(" ");
          const [hours, minutes, seconds] = full_time.split(":");

          __setFormData({
            date_input: new Date(
              year,
              Number(month - 1),
              day,
              Number(hours - 3),
              minutes,
              seconds
            )
              ?.toJSON()
              ?.split(".")?.[0],
            equipe_id: getSelectData({
              data: teams,
              labelKey: "user_name",
              valueKey: "user_id",
            }).find(({ label }) => label === equipe_name),
            doctor_id: getSelectData({
              data: doctors,
              labelKey: "user_name",
              valueKey: "user_id",
            }).find(({ label }) => label === doctor_name),
            medicine_id: getSelectData({
              data: medicines,
              labelKey: "medicamento",
            }).find(({ label }) => label === medicamento),
            status_id: getSelectData({
              data: statusData,
              labelKey: "status_name",
              valueKey: "id",
            }).find(({ label }) => label === status_name_clone),
          });

          openModalRef.current.click();
          setSelectedItem(item);
        }}
        setDataProp={(index, value = {}) => {
          setExams((prev) => {
            prev[index] = { ...prev[index], ...value };
            return [...prev];
          });
        }}
      />

      {renderUpdateModal()}
    </AppContent>
  );
}
