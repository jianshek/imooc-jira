import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useMount, useDebounce,useDocumentTitle} from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
//process. : yarn start时,使用的是.env.development里的值, yarn build时,使用.env里的值
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    useDocumentTitle('项目列表',false);
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    /*
    * SearchPanel中的输入框快速输入时,param变化很快,但是不能每次param变化都去请求数据
    * debouncedParam:param变化一秒后返回新的param
    * */
    const debouncedParam = useDebounce(param, 1000);
    //data: list 给data起别名为list
    const { isLoading, error, data: list } = useProjects(debouncedParam);
    const { data: users } = useUsers();

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        {error ? (
            <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        {/* 因为List组件ListProps继承TableProps,所以直接传Table的属性loading和dataSource即可,{...props}会展开对应的属性传入给Table */}
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

const Container = styled.div`
   padding: 3.2rem;
 `;