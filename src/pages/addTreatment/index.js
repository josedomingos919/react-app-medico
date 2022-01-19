import { useCallback, useState, useEffect } from "react";
import { AppContent } from "../../components";
import { Loader } from "../../components";
import { services } from "../../service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { RightSide, LeftSide } from "./components";
import { useApp } from "./../../context/app";
import { useNavigate } from "react-router-dom";

import "./style.css";

export function AddTreatment() {
  const navigate = useNavigate();
  const { id: tratmentId } = useParams();
  const { setMedicines, setTeams, setDoctors, treatment, setTreatmentError } =
    useApp();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = useCallback(async () => {
    setTreatmentError(true);

    for (let e of treatment)
      if (
        !e?.date_input ||
        !e?.doctor_id?.value ||
        !e?.dose ||
        !e?.equipe_id?.value ||
        !e?.medicine_id?.value
      )
        return;

    const formData = {
      exame_id: tratmentId,
      data: treatment.map(
        ({ dose, date_input, doctor_id, equipe_id, medicine_id }) => ({
          dose,
          date_input,
          doctor_id: doctor_id?.value,
          equipe_id: equipe_id?.value,
          medicine_id: medicine_id?.value,
        })
      ),
    };

    setIsLoading(true);
    const response = await services.waiting.create(formData);
    setIsLoading(false);

    if (response?.data?.success) {
      toast.success("Tratamento criado com sucesso!");
      navigate("/dashboard/requests");
    } else {
      toast.error("Falha ao carregar os medicamentos!");
    }
  }, [treatment, setTreatmentError, navigate, tratmentId]);

  const getMedicines = useCallback(async () => {
    const response = await services.medicine.get();
    if (response?.data?.success) setMedicines(response.data.payload ?? []);
    else toast.error("Falha ao carregar os medicamentos!");
  }, [setMedicines]);

  const getTeam = useCallback(async () => {
    const response = await services.waiting.getTeam();
    //TUDO: API DEVE DEVOLVER O USER ID
    if (response?.data?.success)
      setTeams(
        response.data.payload.map((e, index) => ({
          ...e,
          user_id: index + 1,
        })) ?? []
      );
    else toast.error("Falha ao carregar a equipe!");
  }, [setTeams]);

  const getDoctors = useCallback(async () => {
    const response = await services.waiting.getDoctors();
    //TUDO: API DEVE DEVOLVER O USER ID
    if (response?.data?.success)
      setDoctors(
        response.data.payload.map((e, index) => ({
          ...e,
          user_id: index + 1,
        })) ?? []
      );
    else toast.error("Falha ao carregar os médicos plantonista!");
  }, [setDoctors]);

  useEffect(() => {
    getTeam();
    getDoctors();
    getMedicines();
  }, [getMedicines, getDoctors, getTeam]);

  return (
    <AppContent activePath="/dashboard/requests">
      <div className=" registerMedi odd">
        <div className="row odd">
          <div className="col-6">
            <h1 className="mainHeading">Criar um tratamento</h1>
          </div>
          <div className="col-6 text-center text-lg-right">
            <button
              onClick={() => handleSave()}
              disabled={isLoading}
              type="submit"
              className="mainBtn"
            >
              {isLoading ? <Loader /> : "Enviar"}
            </button>
          </div>
        </div>
        <div className="tableContents">
          <div className="col-12">
            <div className="row">
              <LeftSide />
              <RightSide />
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  );
}
