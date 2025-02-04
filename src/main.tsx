import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { Provider } from "react-redux";
import { store } from "./Redux/feature/store";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <Toaster position="top-center"></Toaster>
    </ThemeProvider>
  </StrictMode>
);
