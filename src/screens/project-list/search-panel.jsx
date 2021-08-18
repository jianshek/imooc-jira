

export const SearchPanel = ({users, param, setParam}) => {

    return <form>
        <div>
            {/*setParam(Object.assign({}, param, {name:evt.target.value})) 拷贝原来的值,不改变原来的值*/}
            <input type="text" value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value={''}>负责人</option>
                {
                    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
                }
            </select>
        </div>
    </form>
}