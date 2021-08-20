import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

//RequestInit:fetch请求配置类型
interface Config extends RequestInit {
    token?: string;
    data?: object;
}

/**
 * endpoint:接口名
 * Config = {},设定默认值,有默认值,参数就变成了可选参数
 * */
export const http = async (
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };

    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`;  //参数拼接在url后面
    } else {
        config.body = JSON.stringify(data || {});  //参数放在body里
    }

    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常(axios要比fetch更好一些,推荐使用axios)
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);  //reject:外界fetch调用的catch可以抓到
            }
        });
};

export const useHttp = () => {
    const { user } = useAuth();
    // TODO 讲解 TS 操作符
    return (...[endpoint, config]: Parameters<typeof http>) =>
        http(endpoint, { ...config, token: user?.token });
};