import React from "react";

import { Spin } from "antd";

import "./index.less";

function MyLoading() {
  return (
    <div className="page-MyLoading">
      <Spin
        size="large"
        tip={<div className="page-MyLoading-content">加载中......</div>}
      />
    </div>
  );
}

export default MyLoading;
