
//登录认证的上下文

import React, { ReactNode, useCallback} from "react";
import * as auth from "auth-provider";
import {User} from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import * as authStore from "store/auth.slice";
import { bootstrap, selectUser } from "store/auth.slice";
import { useDispatch, useSelector } from "react-redux";

export interface AuthForm {
    username: string;
    password: string;
}

export const bootstrapUser = async () => {
    let user = null;
    const token = auth.getToken();
    if (token) {
        const data = await http("me", { token }); //获取用户信息
        user = data.user;
    }
    return user;
};

//AuthProvider:虽然名称是AuthProvider,但是和provider没有任何关系了,只是一个普通组件
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
    // dispatch: (...args: unknown[]) => Promise<User> 设置dispatch的返回promise,这样其他地方调用的时候可以使用.then
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

    useMount(() => {
        run(dispatch(bootstrap()));
    });

    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }

    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }

    return <div>{children}</div>;
};

export const useAuth = () => {
    // dispatch: (...args: unknown[]) => Promise<User> 设置dispatch的返回promise,这样其他地方调用的时候可以使用.then
    const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
    const user = useSelector(selectUser);
    const login = useCallback(
        (form: AuthForm) => dispatch(authStore.login(form)),  //使用thunk,dispatch异步函数和同步函数没有任何区别
        [dispatch]
    );
    const register = useCallback(
        (form: AuthForm) => dispatch(authStore.register(form)),
        [dispatch]
    );
    const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
    return {
        user,
        login,
        register,
        logout,
    };
};