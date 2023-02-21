import ajax from "./ajax";
import { GET } from "../util/constant";
/* 
    获取aboutMe页面数据
*/

export const getAboutMeVal = () => ajax("/client/getAboutMe", GET);

/* 
    获取工作经验页面
*/

export const getWorkForVal = () => ajax("/client/getWorkFor", GET);

/*
    项目
*/
export const getClassies = () => ajax("/client/getSRClassies", GET);
export const getSampleBeels = (data) =>
  ajax("/client/getSampleReels", GET, data);
// 获取项目详情
export const getSampleBeelsDetail = (data) =>
  ajax("/client/getSampleBeelsDetail", GET, data);
