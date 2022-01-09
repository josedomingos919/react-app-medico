import { AppContent } from "../../components";

export function AddEmployees() {
  return (
    <AppContent activePath="/dashboard/colaborators">
      <div class=" registerMedi odd">
        <div class="row odd">
          <div class="col-6">
            <h1 class="mainHeading">Cadastrar Colaborador</h1>
          </div>
          <div class="col-6 text-center text-lg-right">
            <a class="mainBtn" href="#">
              Salvar
            </a>
          </div>
        </div>
        <div class="tableContents">
          <div class="row">
            <div class="col-lg-3">
              <input
                class="registerInput"
                type="text"
                name=""
                id=""
                placeholder="Nome do médico"
              />
            </div>
            <div class="col-lg-3 my-3 my-lg-0">
              <input
                class="registerInput"
                type="email"
                name=""
                id=""
                placeholder="E-mail"
              />
            </div>
            <div class="col-lg-3">
              <input
                class="registerInput"
                type="text"
                name=""
                id=""
                placeholder="Telefone"
              />
            </div>
          </div>
          <div class="borderLine my-4"></div>
          <h3 class="subHeading pl-3 mb-3">Horários de atendimento</h3>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Segunda-feira
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Terça-feira
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Quarta-feira
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Quinta-feira
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Sexta-feira
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Sábado
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-lg-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="row hoursRow">
            <div class="col-lg-2">
              <label class="reisterLabel" for="">
                Domingo
              </label>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
            <div class="col-lg-1">
              <div class="smText">até</div>
            </div>
            <div class="col-lg-1 px-0">
              <input
                class="registerInput"
                type="time"
                name=""
                id=""
                placeholder="00:00"
              />
            </div>
          </div>
          <div class="borderLine my-4"></div>
          <div class="row">
            <div class="col-lg-4">
              <div class="registerRadioBtn">
                <label class="container-radio-button">
                  Equipe de atendimento
                  <input checked id="check" type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
            <div class="col-lg-4 mt-3 mt-lg-0">
              <div class="registerRadioBtn">
                <label class="container-radio-button">
                  Médico Plantonista
                  <input id="check2" type="checkbox" />
                  <span class="checkmark"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  );
}
