
//登录认证的上下文

import React, { ReactNode, useState} from "react";
import * as auth from "auth-provider";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import {User} from "../types/user";
import { useQueryClient } from "react-query";

interface AuthForm {
    username: string;
    password: string;
}

const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", { token }); //获取用户信息
        user = data.user;
    }
    return user;
};

//全局上下文
const AuthContext = React.createContext<{
    user: User | null;
    register: (form: AuthForm) => Promise<void>;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
} | undefined>(undefined);
AuthContext.displayName = "AuthContext";  //displayName:React DevTools 使用该字符串来确定context要显示的内容。

//创建provider,供子组件使用数据
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        run,
        setData: setUser,
    } = useAsync<User | null>();
    const queryClient = useQueryClient();
    // setUser:参数省略,相当于 (user)=>setUser(user)
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => {
        setUser(null);
        queryClient.clear();  //清空缓存的数据
    });
    //页面刚加载时获取用户数据
    useMount(() => {
        run(bootstrapUser());
    });

    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }

    return (
        <AuthContext.Provider
            children={children}
            value={{user, login, register, logout}}    //value:向外界提供的数据
        />
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);  //拿到上下文里的数据
    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};