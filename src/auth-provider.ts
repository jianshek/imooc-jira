

// 模拟登录认证，真实工作中本文件不需要前端开发者开发

import { User } from "screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";  //定义本地存储的key

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || "");
    return user;
};

//登录
export const login = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(data);  //返回promise
        }
    });
};

//注册
export const register = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json());
        } else {
            return Promise.reject(data);
        }
    });
};

//退出登录,添加async,返回promise,在别处可以用.then
export const logout = async () =>
    window.localStorage.removeItem(localStorageKey);