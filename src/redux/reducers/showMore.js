import { TRUE, FALSE } from "../../util/constant";

function showMore(prev = false, action) {
  const { type } = action;
  switch (type) {
    case TRUE:
      return true;
    case FALSE:
      return false;
    default:
      return prev;
  }
}
export default showMore;
