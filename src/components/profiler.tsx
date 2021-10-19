//组件的性能信息
import React, { ProfilerOnRenderCallback, ProfilerProps } from "react";

//metadata:原始数据;metadata:记录mount还是update的性能
type Props = { metadata?: any; phases?: ("mount" | "update")[] } & Omit<
    ProfilerProps,
    "onRender"
    >;

let queue: unknown[] = []; //记录信息的数组

const sendProfileQueue = () => {
    if (!queue.length) {
        return;
    }
    const queueToSend = [...queue];
    queue = [];
    console.log(queueToSend);
};

setInterval(sendProfileQueue, 5000);  //每5秒钟记录一次

export const Profiler = ({ metadata, phases, ...props }: Props) => {
    const reportProfile: ProfilerOnRenderCallback = (
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions
    ) => {
        if (!phases || phases.includes(phase)) {
            queue.push({
                id,
                phase,
                actualDuration,
                baseDuration,
                startTime,
                commitTime,
                interactions,
                metadata,
            });
        }
    };

    //https://reactjs.bootcss.com/docs/profiler.html,不能在生产环境使用
    return <React.Profiler onRender={reportProfile} {...props} />;
};