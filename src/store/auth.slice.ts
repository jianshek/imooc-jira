import { User } from "screens/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import * as auth from "auth-provider";
import { AuthForm, bootstrapUser } from "context/auth-context";
import { AppDispatch, RootState } from "store/index";

interface State {
    user: User | null;
}

const initialState: State = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

//定义redux-thunk函数,双箭头函数,当外界调用时,返回第二个函数,redux-thunk接受到action是一个函数,然后redux-thunk就自己处理了
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
    auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
    auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
    auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
    bootstrapUser().then((user) => dispatch(setUser(user)));