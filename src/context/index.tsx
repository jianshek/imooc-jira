import React, {ReactNode} from "react";
import {AuthProvider} from "context/auth-context";
import {QueryClient, QueryClientProvider} from "react-query";  //操作数据
import {BrowserRouter as Router} from "react-router-dom";

//提供登录认证的provider
export const AppProviders = ({children}: { children?: ReactNode }) => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,  //refetchOnWindowFocus:window获取焦点时就去请求
            },
        },
    });

    return <QueryClientProvider client={queryClient}>
        <Router>
            <AuthProvider>{children}</AuthProvider>
        </Router>
    </QueryClientProvider>
};