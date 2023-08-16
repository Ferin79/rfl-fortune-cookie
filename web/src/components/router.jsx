import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Cookie from "./Cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cookie",
    element: <Cookie />,
  },
]);

export default router;
