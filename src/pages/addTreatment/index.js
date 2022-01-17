import { useCallback, useState, useEffect } from "react";
import { AppContent } from "../../components";
import { isEmpty } from "../../utilities/functions";
import { Loader } from "../../components";
import { services } from "../../service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { RightSide, LeftSide } from "./components";
import { useApp } from "./../../context/app";
import { useForm } from "react-hook-form";

import "./style.css";

export function AddTreatment() {
  const { id: tratmentId } = useParams();
  const { setMedicines, setTeams, setDoctors, registerForm } = useApp();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (data) => {
    console.log("data=> ", data);
  };

  const getMedicines = useCallback(async () => {
    const response = await services.medicine.get();
    if (response?.data?.success) setMedicines(response.data.payload ?? []);
    else toast.error("Falha ao carregar os medicamentos!");
  }, []);

  const getTeam = useCallback(async () => {
    const response = await services.waiting.getTeam();
    if (response?.data?.success) setTeams(response.data.payload ?? []);
    else toast.error("Falha ao carregar a equipe!");
  }, []);

  const getDoctors = useCallback(async () => {
    const response = await services.waiting.getDoctors();
    if (response?.data?.success) setDoctors(response.data.payload ?? []);
    else toast.error("Falha ao carregar os médicos plantonista!");
  }, []);

  useEffect(() => {
    getTeam();
    getDoctors();
    getMedicines();
  }, [getMedicines]);

  useEffect(() => {
    // setRegisterTreatment(register);
  }, []);

  return (
    <AppContent activePath="/dashboard/medication">
      <form onSubmit={registerForm.handleSubmit(handleSave)}>
        <div className=" registerMedi odd">
          <div className="row odd">
            <div className="col-6">
              <h1 className="mainHeading">Criar um tratamento</h1>
            </div>
            <div className="col-6 text-center text-lg-right">
              <button disabled={isLoading} type="submit" className="mainBtn">
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
      </form>
    </AppContent>
  );
}
