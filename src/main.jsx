import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Providers from "./providers";
import { RouterProvider } from "react-router-dom";
import router from "./constants/router";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>
);
