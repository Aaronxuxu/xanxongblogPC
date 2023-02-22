import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "query-string";
import {
  Select,
  Input,
  notification,
  Col,
  Row,
  Image,
  Result,
  Button,
  Tooltip,
} from "antd";

// import UnderConstruction from "../../components/UnderConstruction";
import { getClassIes } from "../../redux/actions/sampleReelsPage";
import MyIcon from "../../util/icon";
import MyLoading from "../../components/MyLoading";
import { getSampleBeels } from "../../api/axios";
// import _debounce from "lodash/debounce";
import "./index.less";

import { IMAGEURL, DEFAULTURL } from "../../util/constant";

function Creation(props) {
  const { search, state, pathname } = useLocation();
  const qsSearch = qs.parse(search);
  const navigate = useNavigate();

  const { getClassIes, classiesList } = props;
  const searchRef = useRef();
  const classifySelect = useRef();
  // 当前搜索内容
  const [searchKey, setSearchKey] = useState(
    qsSearch.projectName ? qsSearch.projectName : ""
  );

  const pageNo = Number(qsSearch.pageNo) || 1;

  // 总页码
  const [pages, setPages] = useState(1);

  // 搜索显隐
  const [isSearchActive, setIsSearchActive] = useState(false);
  // 筛选分类显隐
  const [isClassifyActive, setIsClassifyActive] = useState(false);

  // 列表
  const [dataList, setDataList] = useState([]);

  // 加载参数（分初始化加载与路由参数更改加载）
  const [loadingProps, setLoadingProps] = useState({
    initLoading: true,
    queryLoading: false,
    pageLoading: false,
  });

  // 当前选择器value（根据路由参数决定）
  const [curValue, setCurValue] = useState(null);

  // 获取列表数据
  const getDataList = async () => {
    const parseSearch = qs.parse(search);
    let obj = {};
    if (dataList.length === 0 && pageNo !== 1) {
      obj = {
        pageSize: Number(pageNo) * 10,
        pageNo: 1,
      };
    }
    const { status, msg, data } = await getSampleBeels({
      ...parseSearch,
      ...state,
      ...obj,
    });

    if (status === 0) {
      return notification.error({
        description: msg,
      });
    } else {
      const { list, pages } = data;
      setDataList((state) =>
        dataList.length === 0 && pageNo !== 1
          ? list
          : pageNo === 1
          ? list
          : [...state, ...list]
      );
      setPages(Number(pages));
    }
    setIsSearchActive(false);
    setIsClassifyActive(false);
    setLoadingProps({
      initLoading: false,
      queryLoading: false,
      pageLoading: false,
    });
  };

  // // 选择分类
  const onSelectChange = (val) => {
    const { label, value } = val;
    setLoadingProps((state) => ({ ...state, queryLoading: true }));

    return navigate(`${pathname}?classifyName=${label}`, {
      state: {
        classifyID: value,
      },
    });
  };

  // 搜索项目
  const handleSearch = (e) => {
    const {
      target: { value },
    } = e;
    setLoadingProps((state) => ({ ...state, queryLoading: true }));
    return value.trim() === ""
      ? navigate(`${pathname}`)
      : navigate(`${pathname}?projectName=${value}`);
  };

  // const handleSearchChange = (e) => {
  //   const {
  //     target: { value },
  //   } = e;
  //   console.log(value);
  // };
  // // 防抖搜索项目名称
  // const _handleSearchChange = useCallback(
  //   _debounce(handleSearchChange, 2000, { leading: false, trailing: true }),
  //   []
  // );

  // 继续加载
  const handleLoad = () => {
    setLoadingProps((state) => ({ ...state, pageLoading: true }));
    const obj = {
      ...qsSearch,
      pageNo: Number(pageNo) + 1,
    };

    return navigate(`${pathname}?${qs.stringify(obj)}`, { state });
  };

  // 页面跳转到详情页
  const handleDetail = (item) => {
    const { projectName } = item;

    return navigate(`/creationDetail?projectName=${projectName}`);
  };

  // 初始化获取项目分类
  useEffect(() => {
    if (classiesList.length === 0) {
      getClassIes();
    }
  }, []);

  // 根据路由参数获取数据
  useEffect(() => {
    const parseSearch = qs.parse(search);
    setCurValue({
      label: parseSearch.classifyName ? parseSearch.classifyName : "全部",
      value: state !== null && state.classifyID ? state.classifyID : "ALL",
    });
    setSearchKey(parseSearch.projectName ? parseSearch.projectName : "");
    getDataList();
  }, [search, state]);

  return (
    <div className="creation">
      {/* <UnderConstruction /> */}
      <div className="creation-main">
        {loadingProps.initLoading ? (
          <MyLoading />
        ) : (
          <>
            <div className="creation-main-title">
              <div className="creation-main-title-btnGroup">
                <Tooltip title="搜索项目">
                  <Button
                    size="large"
                    style={{ zIndex: 3 }}
                    shape="circle"
                    icon={<MyIcon type="icon-search" />}
                    onClick={() => {
                      setIsSearchActive(!isSearchActive);
                      searchRef.current.focus();
                    }}
                  />
                </Tooltip>

                <div
                  className={`creation-main-titile-btnGroup-main ${
                    isSearchActive
                      ? "creation-main-title-btnGroup-main-active"
                      : ""
                  }`}
                >
                  <div className="creation-main-titile-btnGroup-main-input">
                    <Input
                      className="creation-main-titile-btnGroup-main-input-case"
                      size="large"
                      placeholder="作品名称，按下回车即可搜索"
                      allowClear
                      bordered={false}
                      onChange={(e) => setSearchKey(e.target.value)}
                      value={searchKey}
                      ref={searchRef}
                      onPressEnter={handleSearch}
                      onBlur={() => {
                        setSearchKey("");
                        return setIsSearchActive(false);
                      }}
                    />
                  </div>
                  {/* <Button
                    size="large"
                    shape="circle"
                    icon={<MyIcon type="icon-jieshu-copy" />}
                    onClick={() => setIsSearchActive(false)}
                    type="text"
                  /> */}
                </div>
              </div>
              <div className="creation-main-title-btnGroup">
                <Tooltip title="项目分类">
                  <Button
                    size="large"
                    style={{ zIndex: 3 }}
                    shape="circle"
                    icon={<MyIcon type="icon-Select" />}
                    onClick={() => {
                      setIsClassifyActive(!isClassifyActive);
                      classifySelect.current.focus();
                    }}
                  />
                </Tooltip>
                <div
                  className={`creation-main-titile-btnGroup-main ${
                    isClassifyActive
                      ? "creation-main-title-btnGroup-main-active"
                      : ""
                  }`}
                >
                  <div className="creation-main-titile-btnGroup-main-input">
                    <Select
                      style={{
                        width: "100%",
                      }}
                      className="creation-main-titile-btnGroup-main-input-case"
                      // showSearch
                      placeholder="Select a person"
                      optionFilterProp="children"
                      onChange={onSelectChange}
                      // onSearch={onSearch}
                      value={curValue}
                      options={classiesList}
                      labelInValue={true}
                      size="large"
                      bordered={false}
                      ref={classifySelect}
                      onBlur={() => setIsClassifyActive(false)}
                    />
                  </div>
                  {/* <Button
                    size="large"
                    shape="circle"
                    icon={<MyIcon type="icon-jieshu-copy" />}
                    onClick={() => setIsClassifyActive(false)}
                    type="text"
                  /> */}
                </div>
              </div>
              {search.trim() !== "" && (
                <div className="creation-main-title-resetBtn">
                  <Tooltip title="重置所有条件">
                    <Button
                      shape="circle"
                      size="large"
                      icon={<MyIcon type="icon-refresh" />}
                      onClick={() => {
                        setLoadingProps((state) => ({
                          ...state,
                          queryLoading: true,
                        }));
                        return navigate(`${pathname}`);
                      }}
                    />
                  </Tooltip>
                </div>
              )}
            </div>

            {loadingProps.queryLoading && <MyLoading />}
            {dataList.length !== 0 ? (
              <>
                <Row
                  className="creation-main-row"
                  align="middle"
                  justify="start"
                  gutter={[0, 30]}
                >
                  {dataList.map((e, i) => (
                    <Col
                      key={e._id}
                      span={20}
                      xs={{ span: 20, offset: 2 }}
                      sm={{ span: 20, offset: 2 }}
                      md={{ span: 10, offset: i % 2 === 0 ? 1 : 2 }}
                      lg={{ span: 7, offset: 1 }}
                      className="creation-main-li"
                      onClick={() => handleDetail(e)}
                    >
                      <div className="creation-main-li-image">
                        <div className="creation-main-li-image-mask">
                          <div className="creation-main-li-image-mask-icon">
                            <MyIcon type="icon-chakan" />
                          </div>
                        </div>
                        <Image
                          className="creation-main-li-image-case"
                          preview={false}
                          width="100%"
                          height="100%"
                          src={
                            e.projectPoster.trim() === ""
                              ? IMAGEURL.ImageNothing
                              : DEFAULTURL + "/" + e.projectPoster
                          }
                          fallback={IMAGEURL.ImageError}
                          placeholder={true}
                        />
                      </div>
                      <div className="creation-main-li-projectName">
                        {e.projectName}
                      </div>
                      <div className="creation-main-li-classify">
                        {e.classify}
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="creation-main-bottomTips">
                  {pages !== pageNo &&
                    (loadingProps.pageLoading ? (
                      <span className="creation-main-bottomTips-loading">
                        正在加载中~~~
                      </span>
                    ) : (
                      <span
                        className="creation-main-bottomTips-more"
                        onClick={handleLoad}
                      >
                        点击加载更多...
                      </span>
                    ))}
                </div>
              </>
            ) : (
              <Result
                className="creation-main-empty"
                icon={<MyIcon type="icon-smail" />}
                title={
                  <span className="creation-main-empty-title">
                    很抱歉，这分类的项目 /
                    搜索关键词的项目还没有，不妨选择其他试试？
                  </span>
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    classiesList: state.sampleReelsPage.classies,
  }),
  { getClassIes }
)(Creation);
