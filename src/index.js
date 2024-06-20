import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NotFound from "./pages/NotFound";
import VideoMain from "./pages/VideoMain";
import VideoCont from "./pages/VideoCont"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <VideoMain />,
      },
      {
        path: "video",
        element: <VideoMain />,
      },
      {
        path: "video/:keyword",
        element: <VideoMain />,
      },
      {
        path: "video/watch/:videoId",
        element: <VideoCont />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
