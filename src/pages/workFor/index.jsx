import React from "react";
import { Chrono } from "react-chrono";
import "./index.less";
import moment from "moment";
const items = [
  {
    title: "2020-06-28",
    cardTitle: "大学毕业",
    cardDetailedText: "专业：网络工程",
  },
  {
    title: "2021-04-06",
    cardTitle: "广州轻微信息科技有限公司",
    url: "http://qwetec.com/",
    cardDetailedText: "岗位：前端开发工程师",
  },
  {
    title: "2022-03-01",
    cardTitle: "日博广告设计部",
    url: "http://rebos.cn/",
    cardDetailedText: "岗位：前端开发工程师",
  },
  {
    title: moment().format("YYYY-MM-DD"),
    cardTitle: "未完待续......",
  },
];

function WorkFor() {
  return (
    <div className="workFor">
      <div className="workFor-Title">关于我的工作经历（不包含实习期）</div>
      <Chrono
        items={items}
        mode="VERTICAL_ALTERNATING"
        hideControls={true}
        theme={{
          primary: "var(--white-1)",
          // 标题背景与选中圆圈颜色
          secondary: "var(--eerie-black-2)",
          cardBgColor: "var(--eerie-black-2)",
          titleColor: "var(--white-1)",
          titleColorActive: "var(--orange-yellow-crayola)",
        }}
        classNames={{
          card: "my-card",
          cardText: "my-card-text",
          cardTitle: "my-card-title",
        }}
        activeItemIndex={0}
        disableClickOnCircle={true}
        cardHeight="auto"
        allowDynamicUpdate={true}
        disableAutoScrollOnClick={true}
      />
    </div>
  );
}
export default WorkFor;
