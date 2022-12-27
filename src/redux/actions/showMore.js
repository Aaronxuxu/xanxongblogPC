import { TRUE, FALSE } from "../../util/constant";

export const showHideMore = (key) => {
  return (dispatch) => {
    return dispatch({
      type: key ? TRUE : FALSE,
    });
  };
};
