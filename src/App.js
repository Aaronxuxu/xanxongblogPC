import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PageLoading from "./components/PageLoading";
import router from "./util/router";
import "./App.less";
import { Col, Row } from "antd";

const Aboutme = lazy(() => import("./pages/aboutMe"));

function App() {
  return (
    <div className="App">
      <Row>
        <Col span={24} xl={{ span: 5 }}>
          <Sidebar />
        </Col>
        <Col span={24} xl={{ span: 18, offset: 1 }} className="base-main">
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
    </div>
  );
}

export default App;
