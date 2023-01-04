import React from "react";
import { Spin, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.less";
function UnderConstruction() {
  return (
    <div className="UnderConstruction">
      <img
        className="UnderConstruction-img"
        src="/static/images/undraw_add_information_j2wg.svg"
        alt="svg加载失败"
      />
      <div className="UnderConstruction-title">
        <Spin
          indicator={
            <LoadingOutlined className="UnderConstruction-title-icon" spin />
          }
        />
        该页面正在建设中。。。。。
      </div>
    </div>
  );
}

export default UnderConstruction;
