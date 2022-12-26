import { lazy } from "react";

const router = [
  {
    label: "关于我",
    path: "aboutme/",
    element: lazy(() => import("../pages/aboutMe")),
  },
  {
    label: "作品集",
    path: "creation/",
    element: lazy(() => import("../pages/creation")),
  },
  {
    label: "工作于",
    path: "workFor/",
    element: lazy(() => import("../pages/workFor")),
  },
];

export default router;
