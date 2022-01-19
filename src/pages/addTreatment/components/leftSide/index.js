import { useCallback, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../../../components";
import { services } from "../../../../service";

import "../../style.css";

export const LeftSide = () => {
  const buttonCloseModal = useRef();
  const navigate = useNavigate();
  const { id: exame_id } = useParams();
  const [error, setError] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefused = useCallback(async () => {
    setError("");

    if (!reason) {
      setError("*Campo obrigatório!");
      return;
    }

    setIsLoading(true);
    const response = await services.waiting.refuse({
      exame_id,
      reason,
    });
    setIsLoading(false);

    if (response?.data?.success) {
      toast.success("Tratamento recusado com sucesso!");
      buttonCloseModal.current.click();
      navigate("/dashboard/requests");
    } else {
      toast.error("Falha ao recusar o medicamentos!");
    }
  }, [reason, setIsLoading, navigate, setError]);

  return (
    <div className="col-3 left-side-menu">
      <div className="mb-5">
        <h2 className="green-text mb-2">Dados da solicitação</h2>
        <p className="dark-text">
          Nome: Jose domingos
          <br />
          Email: jose@gmail.com
          <br />
          Telefone: (11) 3783-47384
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Convênio</h2>
        <p className="dark-text">Plano: Particular</p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Exames e Reituários</h2>
        <p className="dark-text">
          Exames
          <p className="light-green">arquivo.jpg</p>
          Receituário
          <p className="light-green">arquivo.jpg</p>
        </p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Endereço informádio</h2>
        <p className="dark-text">Rua 5, avenida 21 de jáneiro luanda</p>
      </div>
      <div className="mb-5">
        <h2 className="green-text mb-2">Informações Adicionais</h2>
        <p className="dark-text">Périodo de preferencia: Manhã </p>
        <p className="dark-text">Data do priméiro período: 30/01/2021</p>
      </div>
      <div className="mb-5">
        <button
          type="button"
          data-toggle="modal"
          data-target="#exampleModal"
          style={{
            border: "none",
            background: "#dc4245",
          }}
          type="button"
          className="btn btn-danger"
        >
          Recusar
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
                  Atenção!
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
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Qual é o motivo que o atendimento será recusado ?
                  </label>
                  <textarea
                    onChange={(e) => setReason(e?.target?.value)}
                    value={reason}
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea>
                  <span className="span-error">{error}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  ref={buttonCloseModal}
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Sair
                </button>
                <button
                  onClick={() => handleRefused()}
                  type="button"
                  class="btn btn-danger"
                >
                  {isLoading ? <Loader /> : "Recusar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
