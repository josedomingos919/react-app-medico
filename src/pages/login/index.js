import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import "./style.css";

import { Logo } from "../../assets";
import { useAuth } from "../../context/auth";
import { initialFormData, isValidForm } from "./util";
import { loginRequest } from "../../service";
import { Loader } from "./../../components";

export function Login() {
  const { sigIn } = useAuth();
  const { register, handleSubmit, reset } = useForm();

  const [formError, __setFormError] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  const setFormError = (data) =>
    __setFormError((prev) => ({ ...prev, ...data }));

  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormError(initialFormData);

    const isValid = isValidForm(data);

    if (!isValid.status) {
      setFormError(isValid.response);
      setIsLoading(false);
      return;
    }

    const loginResponse = await loginRequest(data);

    setIsLoading(false);

    if (loginResponse?.status !== 200) {
      toast.error("Usuário ou senha não encontrado!");
      return;
    }

    sigIn(loginResponse.data);
    reset();
  };

  return (
    <div className="formContents">
      <div className="brandSide">
        <img className="logo" src={Logo} alt="" />
      </div>
      <div className="formSide">
        <div>
          <h1 className="fromHeading">LOGIN</h1>
          <div className="formParents">
            <form onSubmit={handleSubmit(onSubmit)}>
              <span className="span-error">{formError.email || ""}</span>
              <input
                {...register("email")}
                className="formInput"
                type="email"
                name="email"
                placeholder="E-mail"
                onFocus={() => setFormError({ email: "" })}
              />
              <span className="span-error">{formError?.password || ""}</span>
              <input
                {...register("password")}
                className="formInput"
                type="password"
                name="password"
                placeholder="Senha"
                onFocus={() => setFormError({ password: "" })}
              />

              <div className="formFooter">
                <div>
                  <input type="checkbox" name="" id="lambrar" />
                  <label className="commonText" htmlFor="lambrar">
                    Lembrar-se
                  </label>
                </div>
                <a className="commonText" href="http://#">
                  Esqueci minha senha
                </a>
              </div>
              <button
                onClick={() => {
                  setFormError((prev) => prev++);
                }}
                type="submit"
                className="formBtn"
              >
                {isLoading ? <Loader /> : "Login"}
              </button>
            </form>
            <img className="formLogo" src={Logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
