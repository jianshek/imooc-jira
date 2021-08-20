import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";

//提供登录认证的provider
export const AppProviders = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>{children}</AuthProvider>;
};