import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

/**
 * Partial<D>使用D的部分类型
 * */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    /*
    返回一个函数promise
    * useCallback和useMemo一样,函数使用useCallback,引用类型使用useMemo
    * */
    const fetchProjects = useCallback(
        () => client("projects", { data: cleanObject(param || {}) }),
        [param, client]
    );

    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects,
        });
    }, [param, run, fetchProjects]);

    return result;
};

//编辑项目
export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: "PATCH",
            })
        );
    };
    return {
        mutate,
        ...asyncResult,
    };
};

//添加项目
export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync();
    const client = useHttp();
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: "POST",
            })
        );
    };
    return {
        mutate,
        ...asyncResult,
    };
};