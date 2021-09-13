
import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);
    return [
        useMemo(  //useMemo:类似shouldComponentUpdate,监听param的值,改变时,在执行函数,(js是对象比较是地址比较,比如相同的对象,地址不同使用useState会执行函数,useMemo是比较值,值相同时,不执行函数)
            () => ({ ...param, personId: Number(param.personId) || undefined }),
            [param]
        ),
        setParam,
    ] as const;
};

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
        "projectCreate",  //projectCreate:url中的参数
    ]);

    const open = () => setProjectCreate({ projectCreate: true }); //设置参数的值
    const close = () => setProjectCreate({ projectCreate: false });//设置参数的值,undefined相当于从url中删除此参数

    return {
        projectModalOpen: projectCreate === "true",
        open,
        close,
    };
};