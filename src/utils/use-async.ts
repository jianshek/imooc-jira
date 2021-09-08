import { useCallback,useReducer, useState } from "react";
import { useMountedRef } from "utils/index";

interface State<D> {
    error: Error | null;
    data: D | null;
    stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
    stat: "idle",
    data: null,
    error: null,
};

const defaultConfig = {
    throwOnError: false,  //是否throw error,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();
    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),  //void 0 相当于undefined,啥也不干
        [dispatch, mountedRef]
    );
};

//自定义异步请求hook
export const useAsync = <D>(initialState?: State<D>,  initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, ...initialConfig };
    /**
     * 一般来说,单个变量使用useState,多个变量相互关联使用useReducer(stat,data,error,三者相互关联)
     * useReducer,第一个参数传state,第二个传action
     * https://www.jianshu.com/p/14e429e29798
     * */
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialState,
            ...initialState,
        }
    );
    const safeDispatch = useSafeDispatch(dispatch);
    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
    //useState传入函数,第一次执行时就会执行里面的函数,返回函数() => {}给retry
    //useCallback和useMemo一样,函数使用useCallback,引用类型使用useMemo
    const [retry, setRetry] = useState(() => () => {});

    const setData = useCallback(
        (data: D) =>
            safeDispatch({
                data,
                stat: "success",
                error: null,
            }),
        [safeDispatch]
    );

    const setError = useCallback(
        (error: Error) =>
            safeDispatch({
                error,
                stat: "error",
                data: null,
            }),
        [safeDispatch]
    );

    // run 用来触发异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error("请传入 Promise 类型数据");
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            safeDispatch({ stat: "loading" });
            return promise
                .then((data) => {
                    setData(data);
                    return data;
                })
                .catch((error) => {
                    // catch会消化异常，如果不主动抛出，外面是接收不到异常的
                    setError(error);
                    if (config.throwOnError) return Promise.reject(error);
                    return error;
                });
        },
        [config.throwOnError, safeDispatch, setData, setError]
    );

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        retry,
        ...state,
    };
};