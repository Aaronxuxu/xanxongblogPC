import React, { useEffect, useState } from "react";
import { message } from "antd";
import "./index.less";
import { getAboutMeVal } from "../../api/axios";

function AboutMe() {
  const [content, setContent] = useState("");

  const getVal = async () => {
    let content = sessionStorage.getItem("aboutMeVal");
    console.log(content);
    if (content === null) {
      const { status, data, msg } = await getAboutMeVal();
      if (status === 0) {
        return message.error(msg);
      }
      setContent(data.content);
      sessionStorage.setItem("aboutMeVal", data.content);
    } else {
      setContent(content);
    }
  };

  useEffect(() => {
    getVal();
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </>
  );
}
export default AboutMe;
