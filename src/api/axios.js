import ajax from "./ajax";
import { GET, POST } from "../util/constant";
/* 
    获取aboutMe页面数据
*/

export const getAboutMeVal = () => ajax("/client/getAboutMe", GET);
