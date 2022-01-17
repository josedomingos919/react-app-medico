import Select from "react-select";
import { useForm } from "react-hook-form";

import { useApp } from "../../../../context/app";
import { getSelectData, isEmpty } from "../../../../utilities/functions";
import { validation } from "./validation";

export const Row = () => {
  const { medicines = [], teams = [], doctors = [], registerForm } = useApp();

  const {
    watch,
    formState: { errors },
    register,
  } = registerForm;

  console.log("errors=> ", errors);

  return (
    <div className="col-12 mb-5">
      <div className="row div row">
        <div className="col-4 mb-3 ">
          <h2 className="green-text mb-2">Horários</h2>
          <input
            {...register("date_input", validation.date_input)}
            className="registerInput"
            type="datetime-local"
          />
          <span className="span-error">{errors?.date_input?.message}</span>
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Equipe</h2>
          <Select
            {...register("equipe_name", { required: true })}
            onChange={() => {}}
            isDisabled={isEmpty(teams)}
            options={getSelectData({
              data: teams,
              labelKey: "user_name",
              valueKey: "user_name",
            })}
          />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Médico Platonista</h2>
          <Select
            //            {...register("doctor_name", { required: true })}
            isDisabled={isEmpty(doctors)}
            options={getSelectData({
              data: doctors,
              labelKey: "user_name",
              valueKey: "user_name",
            })}
          />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Medicação</h2>
          <Select
            //{...register("medicamento", { required: true })}
            isDisabled={isEmpty(medicines)}
            options={getSelectData({
              data: medicines,
              labelKey: "medicamento",
            })}
          />
        </div>
        <div className="col-4">
          <h2 className="green-text mb-2">Dose</h2>
          <input
            //{...register("dose", { required: true })}
            className="registerInput"
            type="text"
          />
        </div>
      </div>
    </div>
  );
};
