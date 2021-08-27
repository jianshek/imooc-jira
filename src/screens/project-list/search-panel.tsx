import {Form, Input, Select} from "antd";

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string;
}

interface SearchPanelProps {
    users: User[];
    param: {
        name: string;
        personId: string;
    };
    setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {
    return (
        <Form style={{marginBottom: "2rem"}} layout={"inline"}>
            <Form.Item>
                {/*setParam(Object.assign({}, param, {name:evt.target.value})) 拷贝原来的值,不改变原来的值*/}
                <Input
                    placeholder={"项目名"}
                    type="text"
                    value={param.name}
                    onChange={(evt) => setParam({
                        ...param,
                        name: evt.target.value
                    })}
                />
            </Form.Item>
            <Form.Item>
                <Select
                    style={{width:100}}
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value={""}>负责人</Select.Option>
                    {users.map((user) => (
                        <Select.Option key={user.id} value={String(user.id)}>
                            {user.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
}