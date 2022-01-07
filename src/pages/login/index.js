import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";

import "./style.css";

import { Logo } from "../../assets";
import { initialFormData, isValidForm } from "./util";

export function Login() {
  const { register, handleSubmit } = useForm();

  const [formError, setFormError] = useState(initialFormData);

  const onSubmit = async (data) => {
    setFormError(initialFormData);

    const isValid = isValidForm(data);

    if (!isValid.status) {
      console.log("isValid=> ", isValid);
      setFormError(isValid.response);
      return;
    }

    console.log("de boa", data);
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
              <span className="span-error">{formError.email}</span>
              <input
                {...register("email")}
                className="formInput"
                type="email"
                name="email"
                placeholder="E-mail"
              />
              <span className="span-error">{formError.password}</span>
              <input
                {...register("password")}
                className="formInput"
                type="password"
                name="password"
                placeholder="Senha"
              />
              <div className="formFooter">
                <div>
                  <input type="checkbox" name="" id="lambrar" />
                  <label className="commonText" htmlFor="lambrar">
                    Lembrar-se
                  </label>
                </div>
                <a className="commonText" href="#">
                  Esqueci minha senha
                </a>
              </div>
              <button className="formBtn">Login</button>
            </form>
            <img className="formLogo" src={Logo} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
