import { useCallback, useState } from "react";
import { AppContent } from "../../components";
import { isEmpty } from "../../utilities/functions";
import { Loader } from "../../components";
import { services } from "../../service";
import { toast } from "react-toastify";

export function AddMedication() {
  const [medicine, setMedicine] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    setError("");

    if (isEmpty(medicine)) {
      setIsLoading(false);
      setError("*Campo obrigatório!");
      return;
    }

    const responseMedicine = await services.medicine.add({
      medicamento: medicine,
    });

    if (responseMedicine?.status !== 200) {
      toast.error("Falha ao cadastrar!");
      setIsLoading(false);
      return;
    }

    toast.success("Medicação registrada com sucesso!");
    setMedicine("");
    setIsLoading(false);
  }, [medicine]);

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
