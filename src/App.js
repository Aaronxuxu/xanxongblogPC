import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PageLoading from "./components/PageLoading";
import router from "./util/router";

import { Col, Row, FloatButton } from "antd";
import MyNavLink from "./components/MyNavLink";
import ColumnHeader from "./components/ColumnHeader";
import "./App.less";
const Aboutme = lazy(() => import("./pages/aboutMe"));

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === "/") {
      document.title = "徐轩雄 | 关于我";
    } else {
      let pathName = pathname.slice(1);
      let label = router.find((e) => pathName.includes(e.path)).label;
      document.title = `徐轩雄 | ${label}`;
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
              {router.map((e) => (
                <MyNavLink key={e.path} label={e.label} url={e.path} />
              ))}
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
      <FloatButton.BackTop visibilityHeight={50} />
    </div>
  );
}

export default App;
