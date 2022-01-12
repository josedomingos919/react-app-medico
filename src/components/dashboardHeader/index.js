import { Avatar, Logo } from "../../assets";
import { useAuth } from "./../../context/auth";

export function DashboardHeader() {
  const { singOut } = useAuth();

  return (
    <>
      <div className="hideHeader">
        <i id="sideMenuBtn" className="fas fa-bars"></i>
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
            Administrador <i className="fas fa-chevron-down"></i>
            <img src={Avatar} alt="" />
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
