import { useEffect, useState } from "react";

export const isVoidObj = (value: unknown) => value === undefined || value === null || value === "";

//删除对象的key是空的值
export const cleanObject = (object?: { [key: string]: unknown }) => {

    if (!object) {
        return {};
    }
    const result = { ...object }; //因为js传入的参数都是地址引用,所以先copy一份,不改变原来的变量

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