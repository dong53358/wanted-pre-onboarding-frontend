import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Sign from "./components/views/sign/Sign";
import ToDo from "./components/views/todo/ToDo";
import NotFound from "./components/error/NotFound";
import ErrorComponent from "./components/error/ErrorComponent";

const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}/`,
    element: <Root />,
    children: [
      {
        path: "",
        element: <Sign />,
        errorElement: <ErrorComponent />,
      },
      {
        path: "/todo",
        element: <ToDo />,
        errorElement: <ErrorComponent />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
