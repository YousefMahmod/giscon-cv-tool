import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@app/styles/global.css";
import App from "./App.tsx";
import ProvidersWrapper from "./ProvidersWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </StrictMode>,
);
