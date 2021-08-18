import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {useEffect, useState} from "react";
import {cleanObject, useMount, useDebounce} from "../../utils";
import * as qs from "qs";
//process. : yarn start时,使用的是.env.development里的值, yarn build时,使用.env里的值
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])

    /*
    * SearchPanel中的输入框快速输入时,param变化很快,但是不能每次param变化都去请求数据
    * debouncedParam:param变化一秒后返回新的param
    * */
    const debouncedParam = useDebounce(param, 1000)

    useEffect(() => {
        //qs:参数自动使用&拼接
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam]) //debouncedParam1秒钟才会变化一次

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}