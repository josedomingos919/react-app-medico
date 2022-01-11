import { AppContent } from "../../components";

export function AddEmployees() {
  return (
    <AppContent activePath="/dashboard/colaborators">
      <div className=" registerMedi odd">
        <div className="row odd">
          <div className="col-6">
            <h1 className="mainHeading">Cadastrar Colaborador</h1>
          </div>
          <div className="col-6 text-center text-lg-right">
            <a className="mainBtn" href="#">
              Salvar
            </a>
          </div>
        </div>
        <div className="tableContents">
          <div className="row">
            <div className="col-lg-3">
              <input
                className="registerInput"
                type="text"
                name=""
                id=""
                placeholder="Nome do médico"
              />
            </div>
            <div className="col-lg-3 my-3 my-lg-0">
              <input
                className="registerInput"
                type="email"
                name=""
                id=""
                placeholder="E-mail"
              />
            </div>
            <div className="col-lg-3">
              <input
                className="registerInput"
                type="text"
                name=""
                id=""
                placeholder="Telefone"
              />
            </div>
          </div>
          <div className="borderLine my-4"></div>
          <h3 className="subHeading pl-3 mb-3">Horários de atendimento</h3>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Segunda-feira
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Terça-feira
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Quarta-feira
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Quinta-feira
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Sexta-feira
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Sábado
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-lg-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="row hoursRow">
            <div className="col-lg-2">
              <label className="reisterLabel" for="">
                Domingo
              </label>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div className="col-lg-1">
              <div className="smText">até</div>
            </div>
            <div className="col-lg-1 px-0">
              <input
                className="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div className="borderLine my-4"></div>
          <div className="row">
            <div className="col-lg-4">
              <div className="registerRadioBtn">
                <label className="container-radio-button">
                  Equipe de atendimento
                  <input checked id="check" type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="col-lg-4 mt-3 mt-lg-0">
              <div className="registerRadioBtn">
                <label className="container-radio-button">
                  Médico Plantonista
                  <input id="check2" type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  );
}
