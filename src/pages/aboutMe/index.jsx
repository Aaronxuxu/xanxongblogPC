import React from "react";
import { Typography } from "antd";
import "./index.less";
import { connect } from "react-redux";
import { showHideMore } from "../../redux/actions/showMore";
const { Link } = Typography;
function AboutMe(props) {
  const { showHideMore, showMore } = props;
  const showMoreClick = () => {
    return showHideMore(!showMore);
  };
  return (
    <>
      <p>大家好</p>
      <p>
        我叫徐轩雄，毕业于广东东软学院，专业是网络工程，目前工作岗位是前端开发。
      </p>
      <p>
        掌握技能不多，具体有哪些就在隔壁的框里，点击隔壁框的“查看更多”或者
        <Link onClick={showMoreClick}>点击这里（如果当前已展开，会隐藏）</Link>
        就能看到我掌握的技能啦！
      </p>
      <p>
        技能熟练度？算不上精通专业，但用起来得心应手。虽然当前经验不足，但仍希望能继续在前端这条路上探索前进，逐步增进的自己技术。
      </p>
      <p>
        网站页面设计灵感来源于
        <Link
          target="_blank"
          href="https://js.design/resourceDetails?id=623873209d3ddaa7576a9e65"
        >
          刘梦华UI设计师
        </Link>
        ，感谢他无私奉献。
      </p>
    </>
  );
}
export default connect(
  (store) => ({
    showMore: store.showMore,
  }),
  { showHideMore }
)(AboutMe);
