import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useMount, useDebounce, useDocumentTitle} from "../../utils";
import {useHttp} from "utils/http";
import styled from "@emotion/styled";
import {Button, Typography} from "antd";
import {useProjects} from "utils/project";
import {useUsers} from "utils/user";
import {useProjectsSearchParams} from "screens/project-list/util";
import {Row} from "components/lib";
//process. : yarn start时,使用的是.env.development里的值, yarn build时,使用.env里的值
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
    useDocumentTitle('项目列表', false);
    // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
    // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
    const [param, setParam] = useProjectsSearchParams();

    /*
    * SearchPanel中的输入框快速输入时,param变化很快,但是不能每次param变化都去请求数据
    * debouncedParam:param变化一秒后返回新的param
    * */
    const debouncedParam = useDebounce(param, 1000);
    //data: list 给data起别名为list
    const {isLoading, error, data: list, retry} = useProjects(debouncedParam);
    const {data: users} = useUsers();

    return <Container>
        <Row between={true}>
            <h1>项目列表</h1>
            {props.projectButton}
        </Row>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {error ? (
            <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {/* 因为List组件ListProps继承TableProps,所以直接传Table的属性loading和dataSource即可,{...props}会展开对应的属性传入给Table */}
        <List projectButton={props.projectButton} loading={isLoading} refresh={retry} users={users || []}
              dataSource={list || []}/>
    </Container>
}

const Container = styled.div`
   padding: 3.2rem;
 `;