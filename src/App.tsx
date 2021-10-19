import React from 'react';
import './App.css';
import {useAuth} from "context/auth-context";
// import { AuthenticatedApp } from "authenticated-app";
// import { UnauthenticatedApp } from "unauthenticated-app";
import {useMount} from "./utils";
import {FullPageErrorFallback, FullPageLoading} from "components/lib";

//代码分割,分包,如果用户没有登录先不加载
const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));

//Suspense:懒加载完成前的组件,fallback:Suspense内组件渲染完成前做的事
function App() {
    //跳转登录页面还是首页
    const {user} = useAuth();
    return (
        <div className="App">
            <React.Suspense fallback={<FullPageLoading/>}>
                {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
            </React.Suspense>
        </div>
    );
}

export default App;
