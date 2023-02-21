import { lazy } from "react";

const router = [
  {
    label: "关于我",
    path: "aboutme/",
    element: lazy(() => import("../pages/aboutMe")),
    meta: {
      isHide: false,
    },
  },
  {
    label: "作品集",
    path: "creation",
    element: lazy(() => import("../pages/creation")),
    meta: {
      isHide: false,
    },
  },
  {
    label: "工作于",
    path: "workFor/",
    element: lazy(() => import("../pages/workFor")),
    meta: {
      isHide: false,
    },
  },
  {
    label: "项目详情",
    path: "creationDetail",
    element: lazy(() => import("../pages/creationDetail")),
    meta: {
      isHide: true,
    },
  },
];

export default router;
