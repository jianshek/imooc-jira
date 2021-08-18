

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