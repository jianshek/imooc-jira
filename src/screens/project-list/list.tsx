import {User} from "./search-panel";

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
}

interface ListProps {
    list: Project[];
    users: User[];
}

export const List = ({list, users}: ListProps) => {
    return <table>
        <thead>
        <tr>
            <th>名称</th>
            <th>负责人</th>
        </tr>
        </thead>
        <tbody>
        {
            list.map(project => <tr key={project.id}>
                <td>{project.name}</td>
                {/* ?.表示如果值不存在则返回undefined */}
                <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
            </tr>)
        }
        </tbody>
    </table>
}