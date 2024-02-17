import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import AppearanceContext from "./components/Contexts/AppearanceContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AppearanceContext>
            <App />
        </AppearanceContext>
    </React.StrictMode>
);
