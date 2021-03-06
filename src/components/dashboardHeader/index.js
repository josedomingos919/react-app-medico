import { Avatar, Logo } from "../../assets";
import { useAuth } from "./../../context/auth";

export function DashboardHeader() {
  const { singOut, user } = useAuth();

  return (
    <>
      <div className="hideHeader">
        <label
          htmlFor="sideMenuBtn"
          className="fas fa-bars sideMenuBtn"
        ></label>
        <a className="hideHeaderLogo" href="https://teste.com.br">
          <img src={Logo} alt="" />
        </a>
      </div>
      <div className="dashboardHeader">
        <div className="dropdown">
          <button
            className="headerBtn"
            type="button"
            id="triggerId"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {user?.payload?.user_name} <i className="fas fa-chevron-down"></i>
            {/*<img src={Avatar} alt="" />*/}
          </button>
          <div className="dropdown-menu" aria-labelledby="triggerId">
            <button onClick={() => singOut()} className="dropdown-item">
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
