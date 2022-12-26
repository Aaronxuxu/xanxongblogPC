import React from "react";
import { NavLink } from "react-router-dom";
import "./index.less";
function MyNavLink(props) {
  const { url, label } = props;
  return (
    <NavLink
      to={url}
      className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}
    >
      {label}
    </NavLink>
  );
}
export default MyNavLink;
