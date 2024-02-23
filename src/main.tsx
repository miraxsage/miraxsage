import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import ThemeContext from "./components/contexts/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeContext>
                <App />
            </ThemeContext>
        </Provider>
    </React.StrictMode>
);
