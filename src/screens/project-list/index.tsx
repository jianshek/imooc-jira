import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useMount, useDebounce} from "../../utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
//process. : yarn start时,使用的是.env.development里的值, yarn build时,使用.env里的值
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])
    const client = useHttp(); //网络请求

    /*
    * SearchPanel中的输入框快速输入时,param变化很快,但是不能每次param变化都去请求数据
    * debouncedParam:param变化一秒后返回新的param
    * */
    const debouncedParam = useDebounce(param, 1000)

    useEffect(() => {
        client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    }, [debouncedParam]) //debouncedParam1秒钟才会变化一次

    useMount(() => {
        client("users").then(setUsers);
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}