import {
  SETSAMPLEREELSBASEDATA,
  SETSAMPLEREELSLIST,
} from "../../util/constant";

function sampleReelsPage(
  prev = {
    dataList: [],
    classies: [],
  },
  action
) {
  const { type, data } = action;
  switch (type) {
    case SETSAMPLEREELSBASEDATA:
      return { ...prev, classies: data };
    case SETSAMPLEREELSLIST:
      return { ...prev, dataList: data };
    default:
      return prev;
  }
}

export default sampleReelsPage;
