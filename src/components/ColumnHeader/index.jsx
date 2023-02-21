import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./index.less";
import router from "../../util/router";
import qs from "query-string";
function ColumnHeader() {
  const { pathname, search } = useLocation();

  const [curTitle, setCurTitle] = useState("");

  useEffect(() => {
    let qsSearch = qs.parse(search);

    let labelName =
      pathname === "/"
        ? "关于我"
        : pathname === "/creationDetail"
        ? qsSearch.projectName
        : router.find((e) => e.path === pathname.slice(1)).label;
    setCurTitle(labelName);
  }, [pathname]);

  return <div className="h2 article-title">{curTitle}</div>;
}

export default ColumnHeader;
