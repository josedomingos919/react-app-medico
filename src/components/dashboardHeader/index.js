import { Avatar, Logo } from "../../assets";

export function DashboardHeader() {
  return (
    <>
      <div className="hideHeader">
        <i id="sideMenuBtn" className="fas fa-bars"></i>
        <a className="hideHeaderLogo" href="#">
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
            <a className="dropdown-item" href="#">
              Action 1
            </a>
            <a className="dropdown-item" href="#">
              Action 2
            </a>
            <a className="dropdown-item" href="#">
              Action 3
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
