import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadDevTools } from "jira-dev-tool";
import { AppProviders } from "context";
import {useMount} from "./utils";

loadDevTools(() =>
    ReactDOM.render(
        <React.StrictMode>
            <AppProviders>        {/* index.tsx包裹全局的provider,子组件共享全局数据 */}
                <App />
            </AppProviders>
        </React.StrictMode>,
        document.getElementById("root")
    )
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
