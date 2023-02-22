import React, { useEffect } from "react";
import { register } from "swiper/element/bundle";
import { Image } from "antd";
import { DEFAULTURL, IMAGEURL } from "../../util/constant";

register();

export const MySwiper = (props) => {
  const { dataList } = props;
  useEffect(() => {}, []);
  return (
    <swiper-container
      slides-per-view="1"
      navigation="true"
      autoplay
      keyboard
      loop
    >
      {dataList.map((e, i) => (
        <swiper-slide key={i}>
          <Image
            className="creationDetail-slide-image"
            src={DEFAULTURL + "/" + e}
            preview={false}
            fallback={IMAGEURL.ImageError}
          />
        </swiper-slide>
      ))}
    </swiper-container>
  );
};
