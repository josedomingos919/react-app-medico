import Select from "react-select";

import { useApp } from "../../../../context/app";
import { getSelectData, isEmpty } from "../../../../utilities/functions";

export const Row = ({ index }) => {
  const {
    medicines = [],
    teams = [],
    doctors = [],
    treatment,
    setTreatment: __setTreatment,
    treatmentError,
  } = useApp();

  const setTreatMent = (key = "", value = "") => {
    const obj = [...treatment];
    obj[index] = { ...(obj[index] ?? {}), [key]: value };
    __setTreatment(obj);
  };

  const { date_input, doctor_id, equipe_id, medicine_id, dose } =
    treatment[index] ?? {};

  return (
    <div className="col-12 mb-5">
      <div className="row div row row-container-treatment">
        <div className="col-4 mb-3 ">
          <h2 className="green-text mb-2">Horários</h2>
          <input
            className="registerInput"
            type="datetime-local"
            max="9999-12-31T23:59"
            value={date_input}
            onChange={(e) => setTreatMent("date_input", e?.target?.value)}
          />
          <span className="span-error">
            {treatmentError && !date_input && "*Campo obrigatório!"}
          </span>
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Equipe</h2>
          <Select
            value={equipe_id}
            onChange={(val) => setTreatMent("equipe_id", val)}
            isDisabled={isEmpty(teams)}
            options={getSelectData({
              data: teams,
              labelKey: "user_name",
              valueKey: "user_id",
            })}
          />

          <span className="span-error">
            {treatmentError && !equipe_id?.value && "*Campo obrigatório!"}
          </span>
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Médico Platonista</h2>
          <Select
            value={doctor_id}
            onChange={(val) => setTreatMent("doctor_id", val)}
            isDisabled={isEmpty(doctors)}
            options={getSelectData({
              data: doctors,
              labelKey: "user_name",
              valueKey: "user_id",
            })}
          />
          <span className="span-error">
            {treatmentError && !doctor_id?.value && "*Campo obrigatório!"}
          </span>
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Medicação</h2>
          <Select
            value={medicine_id}
            onChange={(val) => setTreatMent("medicine_id", val)}
            isDisabled={isEmpty(medicines)}
            options={getSelectData({
              data: medicines,
              labelKey: "medicamento",
            })}
          />
          <span className="span-error">
            {treatmentError && !medicine_id?.value && "*Campo obrigatório!"}
          </span>
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Dose</h2>
          <input
            value={dose}
            onChange={(e) => setTreatMent("dose", e?.target?.value)}
            className="registerInput"
            type="text"
          />
          <span className="span-error">
            {treatmentError && !dose && "*Campo obrigatório!"}
          </span>
        </div>
      </div>
    </div>
  );
};
