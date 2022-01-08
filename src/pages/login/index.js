import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "./style.css";

import { Logo } from "../../assets";
import { initialFormData, isValidForm } from "./util";

export function Login() {
  const { register, handleSubmit } = useForm();

  const [formError, __setFormError] = useState(initialFormData);
  const setFormError = (data) =>
    __setFormError((prev) => ({ ...prev, ...data }));

  const onSubmit = async (data) => {
    setFormError(initialFormData);

    const isValid = isValidForm(data);

    if (!isValid.status) {
      setFormError(isValid.response);
      return;
    }

    console.log(data, "data=> ");
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
                Login
              </button>
            </form>
            <img className="formLogo" src={Logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
