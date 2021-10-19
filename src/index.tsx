import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadDevTools} from "jira-dev-tool";
import {AppProviders} from "context";
import "antd/dist/antd.less";
import {Profiler} from "./components/profiler";

loadDevTools(() =>
    ReactDOM.render(
        <React.StrictMode>
            <Profiler id={"Root App"} phases={["mount"]}> {/* 性能检测,正式上线需关闭 */}
                <AppProviders>        {/* index.tsx包裹全局的provider,子组件共享全局数据 */}
                    <App/>
                </AppProviders>
            </Profiler>
        </React.StrictMode>,
        document.getElementById("root")
    )
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
