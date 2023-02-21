import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  notification,
  Carousel,
  Image,
  Result,
  Button,
  Tooltip,
  Row,
  Col,
} from "antd";
import MyIcon from "../../util/icon";
import "./index.less";
import MyLoading from "../../components/MyLoading";
import { IMAGEURL, DEFAULTURL } from "../../util/constant";
import moment from "moment";
import qs from "query-string";

function CreationDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  // 是否正常显示
  const [isNormal, setIsNormal] = useState(true);
  // 是否正在加载中
  const [loading, setLoading] = useState(true);
  // 数据列表
  const [dataVal, setDataVal] = useState(null);
  // 相册模式显隐
  const [visible, setVisible] = useState(false);

  const getDataDetail = async () => {
    const { search } = location;
    let qsSearch = qs.parse(search);

    if (!Object.hasOwn(qsSearch, "projectName")) {
      return navigate("/");
    }

    const { projectName } = qsSearch;
    let { data, msg, status } = await React.$API.getSampleBeelsDetail({
      projectName,
    });
    if (status === 0) {
      notification.error({
        description: msg,
      });
    }

    setIsNormal(status === 1);
    setLoading(false);

    let newSkillArr = [];
    let skillArr = Array.from(
      new Set(data.skillArr.map((e) => e.classify._id))
    );
    skillArr.forEach((el) => {
      newSkillArr.push({
        ...data.skillArr.find((e) => e.classify._id === el).classify,
        children: data.skillArr.filter((e) => e.classify._id === el),
      });
    });
    data = Object.assign(data, { skillArr: newSkillArr });
    setDataVal(data);
    console.log(data.skillArr);
  };

  useEffect(() => {
    getDataDetail();
  }, []);

  return (
    <div className="creationDetail">
      {loading ? (
        <MyLoading></MyLoading>
      ) : isNormal ? (
        <>
          {dataVal.imageArr.length > 0 && (
            <div className="creationDetail-slide">
              {
                <Carousel autoplay>
                  {dataVal.imageArr.map((e, i) => (
                    <Image
                      key={i}
                      className="creationDetail-slide-image"
                      src={DEFAULTURL + "/" + e}
                      preview={false}
                      fallback={IMAGEURL.ImageError}
                    />
                  ))}
                </Carousel>
              }
              {/* 相册模式预览 */}
              <div className="creationDetail-slide-preview">
                <Tooltip placement="top" title="点击可查看大图">
                  <MyIcon
                    type="icon-chakan"
                    className="creationDetail-slide-preview-icon"
                    onClick={() => setVisible(true)}
                  />
                </Tooltip>

                <div style={{ display: "none" }}>
                  <Image.PreviewGroup
                    preview={{
                      visible,
                      onVisibleChange: (vis) => setVisible(vis),
                    }}
                  >
                    {dataVal.imageArr.map((e, i) => (
                      <Image
                        key={i}
                        src={DEFAULTURL + "/" + e}
                        fallback={IMAGEURL.ImageError}
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              </div>
            </div>
          )}

          <div className="creationDetail-content">
            <div className="creationDetail-content-title">
              项目介绍
              <div className="creationDetail-content-title-date">
                {moment(dataVal.projectTimes.startTime).format("YYYY-MM-DD")} 至{" "}
                {moment(dataVal.projectTimes.endTime).format("YYYY-MM-DD")}
              </div>
            </div>
            <div
              className="creationDetail-content-main"
              dangerouslySetInnerHTML={{ __html: dataVal.projectDesc }}
            ></div>
          </div>
          <div className="creationDetail-content">
            <div className="creationDetail-content-title">技术栈</div>
            <div className="creationDetail-content-main">
              {dataVal.skillArr.map((e, i) => (
                <Row
                  gutter={[10, 10]}
                  key={e._id}
                  className={`creationDetail-content-main-ul ${
                    i !== dataVal.skillArr.length - 1 &&
                    "creationDetail-content-main-ul-NoLast"
                  }`}
                >
                  <Col span={24} md={{ span: 3 }}>
                    {e.classifyName}
                  </Col>
                  <Col span={24} md={{ span: 20, offset: 1 }}>
                    <div className="creationDetail-content-main-li">
                      {e.children.map((el) => (
                        <div key={el._id}>{el.skillName}</div>
                      ))}
                    </div>
                  </Col>
                </Row>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Result
          className="creationDetail-empty"
          icon={<MyIcon type="icon-smail" />}
          title={
            <span className="creationDetail-empty-title">
              很抱歉，项目加载失败，麻烦刷新试试。
            </span>
          }
          extra={
            <Button
              size="large"
              shape="circle"
              icon={<MyIcon type="icon-refresh" />}
              onClick={() => {
                setLoading(true);
                getDataDetail();
              }}
            />
          }
        />
      )}
    </div>
  );
}

export default CreationDetail;
