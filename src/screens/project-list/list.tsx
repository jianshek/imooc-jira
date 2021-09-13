import {User} from "./search-panel";
import {Dropdown, Menu, Table} from "antd";
import dayjs from "dayjs";
import {TableProps} from "antd/es/table";
import {Link} from "react-router-dom";
import {Pin} from "components/pin";
import {useEditProject} from "utils/project";
import { ButtonNoPadding } from "components/lib";
export interface Project {
    id: number;
    name: string;
    personId: number;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps extends TableProps<Project> {
    users: User[];
    refresh?: () => void;
}

export const List = ({users, ...props}: ListProps) => {
    const {mutate} = useEditProject();
    const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh);
    return (
        <Table
            rowKey={"id"}
            pagination={false}
            columns={[
                {
                    title: <Pin checked={true} disabled={true}/>,
                    render(value, project) {
                        return (
                            <Pin
                                checked={project.pin}
                                /*
                                * 1,点击星星的时候,会触发Pin组件的onChange方法
                                * 2,Pin组件声明onCheckedChange回调方法,回传一个bool值
                                * 3,在此文件使用Pin组件,并定义onCheckedChange时,可以拿到这个bool值
                                * 4,pinProject(project.id)返回的是(pin: boolean) => mutate({ id, pin }).then(props.refresh)
                                * 5,所以可以直接获得回传回来的pin值去mutate({ id, pin })
                                * */
                                onCheckedChange={pinProject(project.id)}
                            />
                        );
                    },
                },
                {
                    title: "名称",
                    sorter: (a, b) => a.name.localeCompare(b.name),
                    render(value, project) {
                        return <Link to={String(project.id)}>{project.name}</Link>;
                    },
                },
                {
                    title: "部门",
                    dataIndex: "organization",
                },
                {
                    title: "负责人",
                    render(value, project) {
                        return (<span>
                 {users.find((user) => user.id === project.personId)?.name ||
                 "未知"}
               </span>
                        );
                    },
                },
                {
                    title: "创建时间",
                    render(value, project) {
                        return (
                            <span>
                 {project.created
                     ? dayjs(project.created).format("YYYY-MM-DD")
                     : "无"}
               </span>
                        );
                    },
                },
                {
                    render(value, project) {
                        return (
                            <Dropdown

                                overlay={
                                    <Menu >
                                        <Menu.Item  key={"edit"}>编辑</Menu.Item>
                                    </Menu>
                                }
                            >
                                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
                            </Dropdown>
                        );
                    },
                },
            ]}
            {...props}
        />
    );
}