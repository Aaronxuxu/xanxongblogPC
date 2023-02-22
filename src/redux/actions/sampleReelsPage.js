import {
  SETSAMPLEREELSBASEDATA,
  // SETSAMPLEREELSLIST,
} from "../../util/constant";
import {
  getClassies,
  //  getSampleBeels
} from "../../api/axios";

import { notification } from "antd";

export const getClassIes = () => {
  return async (dispatch) => {
    const { status, msg, data } = await getClassies();
    if (status === 0) {
      return notification.error({
        description: msg,
      });
    } else {
      const list = [
        { label: "全部", value: "ALL" },
        ...data.map((e) => ({
          label: e.classifyName,
          value: e._id,
        })),
      ];

      dispatch({ type: SETSAMPLEREELSBASEDATA, data: list });
    }
  };
};

// export const getSBList = (query) => {
//   return async (dispatch) => {
//     const { status, msg, data } = await getSampleBeels(query);
//   };
// };
