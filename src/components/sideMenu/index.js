import { Avatar, Logo } from "../../assets";
import { useAuth } from "../../context/auth";
import { isActiveRoute, menuData } from "./util";

export function SideMenu({ activePath }) {
  const { user = {} } = useAuth();

  return (
    <>
      <input
        type="checkbox"
        id="sideMenuBtn"
        style={{
          display: "none",
        }}
      />
      <div id="pageSideMenu" className="sideMenu">
        <div className="sideMenuBrand">
          <div className="userInfo">
            <label
              htmlFor="sideMenuBtn"
              id="closedMenuBtn"
              className="far fa-times-circle"
            ></label>
            <img src={Avatar} alt="" />
            <div>
              <div className="name">{user?.payload?.user_name ?? ""}</div>
              <div className="emailText">
                {" "}
                {user?.payload?.user_mail ?? ""}{" "}
              </div>
            </div>
          </div>
          <a className="brandLink" href="/dashboard/home">
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
    </>
  );
}
