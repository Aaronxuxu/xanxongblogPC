import React, { useEffect, useState } from "react";
import { Chrono } from "react-chrono";
import "./index.less";
import moment from "moment";
import { getWorkForVal } from "../../api/axios";
import { message } from "antd";

function WorkFor() {
  const [items, setItem] = useState([]);

  const getVal = async () => {
    let content = JSON.parse(sessionStorage.getItem("workForVal"));
    if (content === null) {
      const { data, msg, status } = await getWorkForVal();
      if (status === 0) {
        return message.open({
          type: "error",
          content: msg,
        });
      }
      content = data;
      sessionStorage.setItem("workForVal", JSON.stringify(content));
    }
    const itemsList = [
      {
        title: "2020-06-28",
        cardTitle: "大学毕业",
        cardDetailedText: "专业：网络工程",
      },
      ...content.map((e) => ({
        title: (
          <div className="workForVal-Chrono-title">
            <div className="workForVal-Chrono-title-time">
              {moment(e.joinTime).format("YYYY-MM-DD")}
            </div>
            <div className="workForVal-Chrono-title-split" />
            <div className="workForVal-Chrono-title-time">
              {moment(e.exitTime).format("YYYY-MM-DD")}
            </div>
          </div>
        ),
        cardTitle: e.company,
        url: e.companyUrl,
        cardDetailedText: `岗位：${e.appointment}`,
      })),
      {
        title: moment().format("YYYY-MM-DD"),
        cardTitle: "未完待续......",
      },
    ];
    return setItem(itemsList);
  };

  useEffect(() => {
    getVal();
  }, []);

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
          title: "my-title",
        }}
        activeItemIndex={0}
        disableClickOnCircle={true}
        cardHeight="auto"
        allowDynamicUpdate={true}
        disableAutoScrollOnClick={true}
      ></Chrono>
    </div>
  );
}
export default WorkFor;
