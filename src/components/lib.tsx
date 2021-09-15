import styled from "@emotion/styled";
import React from "react";
import { Button, Spin, Typography } from "antd";

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

const FullPage = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
   align-items: center;
 `;

//页面loading
export const FullPageLoading = () => (
    <FullPage>
        <Spin size={"large"} />
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