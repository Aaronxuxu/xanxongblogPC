import { lazy } from "react";

const router = [
  {
    path: "aboutme/",
    element: lazy(() => import("../pages/aboutMe")),
  },
  {
    path: "creation/",
    element: lazy(() => import("../pages/creation")),
  },
  {
    path: "workFor",
    element: lazy(() => import("../pages/workFor")),
  },
];

export default router;
