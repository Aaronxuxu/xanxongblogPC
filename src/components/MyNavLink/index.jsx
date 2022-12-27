import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./index.less";
function MyNavLink(props) {
  const { url, label } = props;
  const { pathname } = useLocation();

  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        `navbar-link ${
          pathname === "/" && url === "aboutme/"
            ? "active"
            : isActive
            ? "active"
            : ""
        }`
      }
    >
      {label}
    </NavLink>
  );
}
export default MyNavLink;
