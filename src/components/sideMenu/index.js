import { Avatar, Logo } from "../../assets";
import { isActiveRoute, menuData } from "./util";

export function SideMenu({ activePath }) {
  return (
    <div id="pageSideMenu" className="sideMenu">
      <div className="sideMenuBrand">
        <div className="userInfo">
          <i id="closedMenuBtn" className="far fa-times-circle"></i>
          <img src={Avatar} alt="" />
          <div>
            <div className="name">Administrador</div>
            <div className="emailText">admin@admin.com.br</div>
          </div>
        </div>
        <a className="brandLink" href="https://teste.com.br">
          <img src={Logo} alt="" />
        </a>
      </div>
      <div className="sideMenuLinks">
        {menuData.map(({ path, label, img }) => (
          <a
            key={Math.random().toString()}
            className={`sideMenuLink ${
              activePath === path
                ? "active"
                : isActiveRoute(path)
                ? "active"
                : ""
            }`}
            href={path}
          >
            <span>
              <img src={img} alt="" />
            </span>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
