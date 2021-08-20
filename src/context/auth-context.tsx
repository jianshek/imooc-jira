
//登录认证的上下文

import React, { ReactNode, useState} from "react";
import * as auth from "auth-provider";
import {User} from "screens/project-list/search-panel";

interface AuthForm {
    username: string;
    password: string;
}

//全局上下文
const AuthContext = React.createContext<{
    user: User | null;
    register: (form: AuthForm) => Promise<void>;
    login: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
} | undefined>(undefined);
AuthContext.displayName = "AuthContext";

//创建provider,供子组件使用数据
export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // setUser:参数省略,相当于 (user)=>setUser(user)
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));

    return (
        <AuthContext.Provider
            children={children}
            value={{user, login, register, logout}}
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