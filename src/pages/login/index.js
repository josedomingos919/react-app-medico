import React from "react";

import "./style.css";

import { Logo } from "../../assets";

export function Login() {
  return (
    <>
      <div className="formContents">
        <div className="brandSide">
          <img className="logo" src={Logo} alt="" />
        </div>
        <div className="formSide">
          <div>
            <h1 className="fromHeading">LOGIN</h1>
            <div className="formParents">
              <form action="">
                <input
                  className="formInput"
                  type="email"
                  name=""
                  id=""
                  placeholder="E-mail"
                />
                <input
                  className="formInput"
                  type="text"
                  name=""
                  id=""
                  placeholder="Senha"
                />
                <div className="formFooter">
                  <div>
                    <input type="checkbox" name="" id="lambrar" />
                    <label className="commonText" for="lambrar">
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
    </>
  );
}
