import React, { useRef, useState, useEffect, useCallback } from "react";
import _ from "lodash";
import LazyLoad from "react-lazyload";
import { Space, Row, Col, Image } from "antd";
import MyIcon from "../../util/icon";
import "./index.less";

const contactsVal = [
  { icon: "icon-phone", title: "手机", value: "13129189764" },
  { icon: "icon-wechat-fill", title: "微信", value: "XanXong" },
  { icon: "icon-email", title: "邮箱", value: "a470164479@gmail.com" },
];

// 掌握框架技能
const userskillVal = [
  {
    title: "基础",
    icon: "icon-jichuxinxi",
    list: [
      { title: "CSS", icon: "icon-css" },
      {
        title: "JavaScript",
        icon: "icon-logo-javascript",
      },
    ],
  },
  {
    title: "框架",
    icon: "icon-yemiankuangjia_o",
    list: [
      { title: "Vue", icon: "icon-Vue" },
      { title: "React", icon: "icon-react" },
      { title: "微信小程序", icon: "icon-weixinxiaochengxu" },
    ],
  },
  {
    title: "库",
    icon: "icon-ziliaoku",
    list: [
      { title: "Bootstrap", icon: "icon-Bootstrap" },
      {
        title: "e-chart",
        icon: "icon-piechart",
      },
      {
        title: "Node.js",
        icon: "icon-node",
      },
    ],
  },
  {
    title: "UI库",
    icon: "icon-_UIsheji",
    list: [
      {
        title: "Ant-Design",
        icon: "icon-antdesign",
      },
    ],
  },
  {
    title: "其他",
    icon: "icon-qita",
    list: [
      {
        title: "GIT",
        icon: "icon-git",
      },
    ],
  },
];

function Sidebar() {
  // 更多内容的元素
  const moreDIVRef = useRef();
  // userInfo元素
  const userInfoRef = useRef();

  // 窗口宽度是否大于1200
  const [moreShow, setMoreShow] = useState(false);
  const [heightObj, setHeightObj] = useState({
    userinfoH: 0,
    moreH: 0,
  });

  const showMore = () => {
    return setMoreShow(!moreShow);
  };

  useEffect(() => {
    setHeightObj({
      userinfoH: userInfoRef.current.scrollHeight,
      moreH: moreDIVRef.current.scrollHeight,
    });
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  // 监听窗口变化
  const windowResize = _.debounce(
    () => {
      setHeightObj({
        userinfoH: userInfoRef.current.scrollHeight,
        moreH: moreDIVRef.current.scrollHeight,
      });
    },
    150,
    { leading: false, trailing: true }
  );

  return (
    <div
      className="sidebar"
      style={{
        height: moreShow
          ? heightObj.moreH + heightObj.userinfoH
          : heightObj.userinfoH,
      }}
    >
      <div className="sidebar-userInfo" ref={userInfoRef}>
        <Row gutter="8">
          <Col xl={24} className="userInfo-flex">
            <figure className="userInfo-image">
              <LazyLoad>
                <Image
                  preview={false}
                  placeholder
                  src="/static/images/userImage.jpg"
                  alt=""
                />
              </LazyLoad>
            </figure>
          </Col>
          <Col xl={24} className="userInfo-flex">
            <h1 className="userInfo-userName">徐轩雄</h1>
            <div className="userInfo-situation">前端开发</div>
          </Col>
        </Row>
      </div>
      <div
        ref={moreDIVRef}
        className="sidebar-more"
        style={{
          opacity: moreShow ? "1" : "0",
          visibility: moreShow ? "visible" : "hidden",
        }}
      >
        <div className="sidebar-more-base sidebar-contacts">
          <Row gutter={[16, 16]}>
            {contactsVal.map((e) => (
              <Col key={e.title} span={24} md={12} xl={24}>
                <Space>
                  <div className="sidebar-contacts-iconbox">
                    <MyIcon className="iconbox-icon" type={e.icon} />
                  </div>
                  <div className="sidbar-contacts-content">
                    <div className="sidbar-contacts-content-title">
                      {e.title}
                    </div>
                    <div className="sidbar-contacts-content-main">
                      {e.value}
                    </div>
                  </div>
                </Space>
              </Col>
            ))}
          </Row>
        </div>
        <div className="sidebar-more-base sidevar-userskill">
          <div className="sidevar-userskill-guild">掌握技能</div>
          {userskillVal.map((e) => (
            <div key={e.title} className="sidevar-userskill-list">
              <Space className="sidevar-userskill-list-title">
                {e.title}
                <MyIcon type={e.icon} />
              </Space>
              <div className="sidevar-userskill-items">
                {e.list.map((el) => (
                  <div className="sidevar-userskill-items-item" key={el.title}>
                    <MyIcon
                      className="sidevar-userskill-items-item-icon"
                      type={el.icon}
                    />
                    {el.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="siderbar-showMore" onClick={showMore}>
        {moreShow ? "隐藏" : "查看更多"}
      </div>
    </div>
  );
}

export default Sidebar;
