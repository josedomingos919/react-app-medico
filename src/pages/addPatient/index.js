import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

import { AppContent, Loader } from "../../components";
import { services } from "../../service";
import {} from "./util";
import { validation } from "./validation";
import { isEmpty } from "../../utilities/functions";
import { useNavigate } from "react-router-dom";

export function AddPatient() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    let patientResponse = {};

    if (data?.password !== data?.password_confirmation && !userId) {
      toast.error("A senha de confirmação é diferente da primeira!");
      return;
    }

    setIsLoading(true);

    if (userId) {
      patientResponse = await services.patient.update({
        user_id: userId,
        user_name: data.name,
        user_cellphone: data.cellphone,
        user_mail: data.email,
      });
    } else {
      patientResponse = await services.patient.add(data);
    }

    setIsLoading(false);

    if (!patientResponse?.data?.success) {
      toast.error("Falha ao salvar paciente!");
      return;
    } else {
      toast.success("Paciente salvo com sucesso!");
      navigate("/dashboard/patients");
    }

    reset();
  };

  const getPatientData = useCallback(async () => {
    if (isEmpty(userId)) return;

    const responseDoctor = await services.patient.getOne(userId);

    if (responseDoctor?.data?.success) {
      const formData = responseDoctor?.data?.payload;

      setValue("email", formData?.user_mail);
      setValue("name", formData?.user_name);
      setValue("cellphone", formData?.user_cellphone);
    } else {
      toast.error("Falha ao carregar os dados do colaborador!");
    }
  }, []);

  useEffect(() => {
    getPatientData();
  }, []);

  return (
    <AppContent activePath="/dashboard/patients">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" registerMedi odd">
          <div className="row odd">
            <div className="col-6">
              <h1 className="mainHeading">Cadastrar Paciente</h1>
            </div>
            <div className="col-6 text-center text-lg-right">
              <button disabled={isLoading} className="mainBtn">
                {isLoading ? <Loader /> : "Enviar"}
              </button>
            </div>
          </div>
          <div className="tableContents">
            <div className="row">
              <div className="col-lg-4 mb-3">
                <input
                  type="text"
                  {...register("name", validation.name)}
                  className="registerInput"
                  placeholder="Nome do médico"
                />
                <span className="span-error">{errors?.name?.message}</span>
              </div>
              <div className="col-lg-4 my-3 my-lg-0">
                <input
                  disabled={!isEmpty(userId)}
                  className="registerInput"
                  type="text"
                  {...register("email", validation.email)}
                  placeholder="E-mail"
                />
                <span className="span-error">{errors?.email?.message}</span>
              </div>
              <div className="col-lg-4">
                <input
                  className="registerInput"
                  type="number"
                  {...register("cellphone", validation.cellphone)}
                  placeholder="Telefone"
                />
                <span className="span-error">{errors?.cellphone?.message}</span>
              </div>

              {userId && (
                <div class="form-check edit_password col-lg-4">
                  <div>
                    <input
                      className="registerInput"
                      type="checkbox"
                      {...register("edit_password")}
                      placeholder="Telefone"
                    />
                  </div>
                  <div>
                    <label class="form-check-label">
                      Pretende Atualizar a senha ?
                    </label>
                  </div>
                </div>
              )}

              {!userId || watch("edit_password") ? (
                <>
                  <div className="col-lg-4">
                    <input
                      className="registerInput"
                      type="password"
                      {...register("password", validation.password)}
                      placeholder="Password"
                    />
                    <span className="span-error">
                      {errors?.password?.message}
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <input
                      className="registerInput"
                      type="password"
                      {...register(
                        "password_confirmation",
                        validation.password
                      )}
                      placeholder="Confirmar Password"
                    />
                    <span className="span-error">
                      {errors?.password_confirmation?.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </form>
    </AppContent>
  );
}
