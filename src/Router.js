import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Sign from "./components/views/sign/Sign";
import ToDo from "./components/views/todo/ToDo";
import NotFound from "./components/error/NotFound";

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
    errorElement: <NotFound />,
  },
]);

export default router;
