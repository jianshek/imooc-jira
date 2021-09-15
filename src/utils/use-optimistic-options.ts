//乐观更新

import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (  //设置config
    queryKey: QueryKey,
    callback: (target: any, old?: any[]) => any[]
) => {
    const queryClient = useQueryClient();
    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),  //清除缓存的旧数据
        async onMutate(target: any) {  //onMutate,使用useMutation时触发
            const previousItems = queryClient.getQueryData(queryKey);  //获取旧数据
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callback(target, old);  //把传入的数据和旧数据返回
            });
            return { previousItems };
        },
        onError(error: any, newItem: any, context: any) {  //useMutation失败时触发
            queryClient.setQueryData(queryKey, context.previousItems);  //返回旧数据
        },
    };
};

export const useDeleteConfig = (queryKey: QueryKey) =>  //删除项目的config
    useConfig(
        queryKey,
        (target, old) => old?.filter((item) => item.id !== target.id) || []
    );
export const useEditConfig = (queryKey: QueryKey) =>  //编辑项目的config
    useConfig(
        queryKey,
        (target, old) =>
            old?.map((item) =>
                item.id === target.id ? { ...item, ...target } : item
            ) || []
    );
export const useAddConfig = (queryKey: QueryKey) =>  //添加项目的config
    useConfig(queryKey, (target, old) => (old ? [...old, target] : []));