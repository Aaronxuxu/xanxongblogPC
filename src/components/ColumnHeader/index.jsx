import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.less";
import router from "../../util/router";

function ColumnHeader() {
  const { pathname } = useLocation();

  const [curTitle, setCurTitle] = useState("");
  useEffect(() => {
    let labelName =
      pathname === "/"
        ? "关于我"
        : router.find((e) => e.path === pathname.slice(1)).label;
    setCurTitle(labelName);
  }, [pathname]);

  return <div className="h2 article-title">{curTitle}</div>;
}

export default ColumnHeader;
