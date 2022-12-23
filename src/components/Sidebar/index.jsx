import React, { useRef, useState, useEffect, useCallback } from "react";
import _ from "lodash";

import { Space, Row, Col, Divider } from "antd";
import "./index.less";
function Sidebar() {
  // 更多内容的元素
  const moreDIVRef = useRef();
  // 整体sidebar元素
  const sidebarRef = useRef();

  // 窗口宽度是否大于1200
  const [isResize, setIsResize] = useState(false);
  const [moreShow, setMoreShow] = useState(false);
  const [heightObj, setHeightObj] = useState({
    sidebarH: 0,
    moreH: 0,
  });

  const showMore = () => {
    return setMoreShow(!moreShow);
  };

  useEffect(() => {
    setHeightObj({
      sidebarH: sidebarRef.current.scrollHeight,
      moreH: moreDIVRef.current.scrollHeight,
    });
    console.log(
      sidebarRef.current.scrollHeight,
      moreDIVRef.current.scrollHeight
    );
    setIsResize(window.innerWidth >= 1200);
    window.addEventListener("resize", windowResize);
    return () => {
      window.removeEventListener("resize", windowResize);
    };
  }, []);

  // 监听窗口变化
  const windowResize = _.debounce(
    (e) => {
      const innerWidth = e.target.innerWidth;
      setIsResize(innerWidth >= 1200);
      setHeightObj({
        sidebarH: sidebarRef.current.scrollHeight,
        moreH: moreDIVRef.current.scrollHeight,
      });
    },
    50,
    { leading: false, trailing: true }
  );

  return (
    <div
      ref={sidebarRef}
      className="sidebar base-main"
      style={{
        height: isResize
          ? "auto"
          : moreShow
          ? heightObj.sidebarH
          : heightObj.sidebarH - heightObj.moreH,
      }}
    >
      <div className="sidebar-userInfo">
        <Row gutter={[16, 8]}>
          <Col xl={24} className="userInfo-flex">
            <figure className="userInfo-image">
              <img src="/static/images/userImage.jpg" alt="" />
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
          opacity: isResize ? "1" : moreShow ? "1" : "0",
          visibility: isResize ? "visible" : moreShow ? "visible" : "hidden",
        }}
      >
        <div className="sidebar-contacts">联系方式</div>
        <div className="sidevar-userskill">掌握技能</div>
      </div>
      <div
        style={{ display: isResize ? "none" : "block" }}
        className="siderbar-showMore"
        onClick={showMore}
      >
        查看更多
      </div>
    </div>
  );
}

export default Sidebar;
