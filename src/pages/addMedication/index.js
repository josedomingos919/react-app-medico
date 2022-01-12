import { useCallback, useState, useEffect } from "react";
import { AppContent } from "../../components";
import { isEmpty } from "../../utilities/functions";
import { Loader } from "../../components";
import { services } from "../../service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function AddMedication() {
  const { id: medicamentoId } = useParams();
  const [medicine, setMedicine] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getMedicine = useCallback(async () => {
    const response = await services.medicine.getOne(medicamentoId);
    setMedicine(response?.data?.payload?.medicamento);
  }, [medicamentoId]);

  const handleSave = useCallback(async () => {
    let responseMedicine = {};

    setIsLoading(true);
    setError("");

    if (isEmpty(medicine)) {
      setIsLoading(false);
      setError("*Campo obrigatório!");

      return;
    }

    if (isEmpty(medicamentoId)) {
      responseMedicine = await services.medicine.add({
        medicamento: medicine,
      });
    } else {
      responseMedicine = await services.medicine.update({
        id: medicamentoId,
        medicamento: medicine,
      });
    }

    if (responseMedicine?.status !== 200) {
      toast.error("Falha ao salvar!");
      setIsLoading(false);
      return;
    }

    toast.success("Medicação salva com sucesso!");
    setMedicine("");
    setIsLoading(false);
  }, [medicine, medicamentoId]);

  useEffect(() => {
    getMedicine();
  }, [getMedicine]);

  return (
    <AppContent activePath="/dashboard/medication">
      <div className=" registerMedi odd">
        <div className="row odd">
          <div className="col-6">
            <h1 className="mainHeading">Nova Medicação</h1>
          </div>
          <div className="col-6 text-center text-lg-right">
            <button
              disabled={isLoading}
              className="mainBtn"
              onClick={handleSave}
            >
              {isLoading ? <Loader /> : "Enviar"}
            </button>
          </div>
        </div>
        <div className="tableContents">
          <div className="row">
            <div className="col-lg-3">
              <input
                className="registerInput"
                type="text"
                value={medicine}
                onChange={(e) => setMedicine(e?.target?.value)}
                onFocus={() => setError("")}
                placeholder="Nome da medicação"
              />
              <span className="span-error">{error}</span>
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  );
}
