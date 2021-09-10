import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";  //操作数据
import { Provider } from "react-redux";
import { store } from "store";

//提供登录认证的provider
export const AppProviders = ({ children }: { children: ReactNode }) => {

    const queryClient = new QueryClient();

    return (<Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
    </Provider>)
};