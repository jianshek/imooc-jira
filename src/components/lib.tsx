import styled from "@emotion/styled";
import React from "react";
import { Button, Spin, Typography } from "antd";

/**
 * 使用emotion的styled自定义组件
 * gap,between,marginBottom,自定义属性
 * 属性使用${}
 * > * 子组件样式
 * */
export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number;
}>`
   display: flex;
   align-items: center;
   justify-content: ${(props) => (props.between ? "space-between" : undefined)};
   margin-bottom: ${(props) => props.marginBottom + "rem"};
   > * {
     margin-top: 0 !important;
     margin-bottom: 0 !important;
     margin-right: ${(props) =>
    typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
   }
 `;

export const ButtonNoPadding = styled(Button)`
   padding: 0;
 `;

export const ScreenContainer = styled.div`
   padding: 3.2rem;
   width: 100%;
   display: flex;
   flex-direction: column;
 `;

const FullPage = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
 `;

//页面loading
export const FullPageLoading = () => (
    <FullPage>
        <Spin data-testid={"loading"} size={"large"} />
    </FullPage>
);

//页面错误
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
    <FullPage>
        <ErrorBox error={error} />
    </FullPage>
);

/**
 * 类型守卫
 * 判断是否是Error类型,如果有value.message,那么value is Error
 * is和bool的区别:https://segmentfault.com/a/1190000022883470
 * */
const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
    if (isError(error)) {
        return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
    }
    return null;
};