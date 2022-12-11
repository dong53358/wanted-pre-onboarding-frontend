import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Sign from "./components/views/sign/Sign";
import ToDo from "./components/views/todo/ToDo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Sign />,
      },
      {
        path: "/todo",
        element: <ToDo />,
      },
    ],
  },
]);

export default router;
