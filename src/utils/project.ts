import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
    useAddConfig,
    useDeleteConfig,
    useEditConfig,
} from "utils/use-optimistic-options";

/**
 * Partial<D>使用D的部分类型
 * */
export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp();
    /**
     * useQuery,在内存中缓存数据,使用hook,比redux更贴合
     * ["projects", param]:projects相当于缓存的key,param变化时去请求数据(client请求)
     * */
    return useQuery<Project[]>(["projects", param], () =>
        client("projects", { data: param })
    );
};

//编辑项目
export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp();
    /**
     * useMutation:异步请求数据
     * */
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                method: "PATCH",
                data: params,
            }),
        useEditConfig(queryKey)
    );
};

//添加项目
export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp();
    //useMutation:异步请求数据
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: "POST",
            }),
        useAddConfig(queryKey)
    );
};

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp();

    return useMutation(
        ({ id }: { id: number }) =>
            client(`projects/${id}`, {
                method: "DELETE",
            }),
        useDeleteConfig(queryKey)
    );
};

export const useProject = (id?: number) => {
    const client = useHttp();
    return useQuery<Project>(
        ["project", { id }],
        () => client(`projects/${id}`),
        { //配置文件,id存在的时候再请求数据
            enabled: Boolean(id),
        }
    );
};