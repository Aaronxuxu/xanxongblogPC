import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PageLoading from "./components/PageLoading";
import router from "./util/router";

import { Col, Row } from "antd";
import MyNavLink from "./components/MyNavLink";
import ColumnHeader from "./components/ColumnHeader";
import "./App.less";
const Aboutme = lazy(() => import("./pages/aboutMe"));

function App() {
  const { pathname } = useLocation();

  const [hasNav, setHasNav] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (pathname === "/") {
      document.title = "徐轩雄 | 关于我";
      setHasNav(true);
    } else {
      let pathName = pathname.slice(1);
      let curPath = router.find((e) => e.path === pathName);
      document.title = `徐轩雄 | ${curPath.label}`;
      const { meta } = curPath;
      setHasNav(!meta.isHide);
    }
  }, [pathname]);

  return (
    <div className="App">
      <Row gutter={[0, 20]}>
        <Col span={24} xl={{ span: 5 }} className="base-main">
          <Sidebar />
        </Col>
        <Col
          span={24}
          xl={{ span: 18, offset: 1 }}
          className="base-main route-column"
        >
          <div className="navBar">
            <div className="navBar-list">
              {hasNav ? (
                router.map(
                  (e) =>
                    !e.meta.isHide && (
                      <MyNavLink key={e.path} label={e.label} url={e.path} />
                    )
                )
              ) : (
                <div
                  className="navbar-link navbar-link-back"
                  onClick={() => navigate("/creation")}
                >
                  返回
                </div>
              )}
            </div>
          </div>
          <ColumnHeader />
          <Routes>
            <Route
              index
              element={
                <Suspense fallback={<PageLoading />}>
                  <Aboutme />
                </Suspense>
              }
            ></Route>
            {router.map((e) => (
              <Route
                index={e.index ? true : false}
                key={e.path}
                path={e.path}
                element={
                  <Suspense fallback={<PageLoading />}>
                    <e.element />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </Col>
      </Row>
      {/* <FloatButton.BackTop visibilityHeight={50} /> */}
    </div>
  );
}

export default App;
