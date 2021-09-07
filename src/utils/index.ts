import {useEffect, useState, useRef} from "react";

export const isVoidObj = (value: unknown) => value === undefined || value === null || value === "";

//删除对象的key是空的值
export const cleanObject = (object?: { [key: string]: unknown }) => {

    if (!object) {
        return {};
    }
    const result = {...object}; //因为js传入的参数都是地址引用,所以先copy一份,不改变原来的变量

    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoidObj(value)) {
            delete result[key];
        }
    });
    return result;
};

//类似componentDidMount
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback();
    }, []);
};

/*
* 什么时候定义hook,当函数里使用到hook的时候就定义hook,其他定义成普通函数即可
* <V>:传入泛型V,参数value也是该类型,返回值就可以自动推断(也是V)
*
* */
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // 每次在value变化以后,setValue,并且设置一个定时器
        const timeout = setTimeout(() => setDebouncedValue(value), delay);
        /*
        * useEffect的return函数相当于componentWillUnmount,做一些清理的任务
        * 在delay时间内clearTimeout(timeout)是清除之前的定时器
        * */
        return () => clearTimeout(timeout);
    }, [value]);

    /**
     * 第一次value变化时被第二个useEffect的clearTimeout清理掉
     * 第二次value变化时被第三个useEffect的clearTimeout清理掉
     * 所以只有最后一次的定时器不会被清理
     * 即:在delay时间内不管调用多少次useDebounce,只会返回最后一次value的值
     * */
    return debouncedValue;
};

/**
 * 改变页面标题
 * keepOnUnmount:页面卸载时,是否保持该标题
 * */
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {

    //useRef:返回该组件
    const oldTitle = useRef(document.title).current;
    // 页面加载时: 旧title
    // 加载后：新title
    useEffect(()=>{
        document.title = title;
    },[title]);

    useEffect(() => {
        return () => {  //页面卸载时
            if (!keepOnUnmount) {
                // 如果不指定依赖，读到的就是旧title
                document.title = oldTitle;
            }
        };
    }, [keepOnUnmount, oldTitle]);

}

//回到主页面
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 传入一个对象，和键集合，返回对应的对象中的键值对
 * @param obj
 * @param keys
 */
export const subset = <
    O extends { [key in string]: unknown },
    K extends keyof O
    >(
    obj: O,
    keys: K[]
) => {
    const filteredEntries = Object.entries(obj).filter(([key]) =>
        keys.includes(key as K)
    );
    return Object.fromEntries(filteredEntries) as Pick<O, K>;
};

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    });

    return mountedRef;
};