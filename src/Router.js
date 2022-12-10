import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ToDo from "./todo/ToDo";
import Sign from "./Sign";

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
