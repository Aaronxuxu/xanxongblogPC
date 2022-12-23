import React from "react";
import { Spin } from "antd";
import "./index.less";
function PageLoading() {
  return (
    <div className="pageloading">
      <Spin size="large" tip="Loading" />
    </div>
  );
}
export default PageLoading;
