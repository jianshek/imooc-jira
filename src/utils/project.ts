import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

/**
 * Partial<D>使用D的部分类型
 * */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    const { run, ...result } = useAsync<Project[]>();
    //返回一个函数promise
    const fetchProjects = () =>
        client("projects", { data: cleanObject(param || {}) });

    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);

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