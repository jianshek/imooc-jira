import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import {
    useKanbansQueryKey,
    useTasksModal,
    useTasksSearchParams,
} from "screens/kanban/util";
import { CreateTask } from "screens/kanban/create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { Row } from "components/lib";
import { useTaskTypes } from "utils/task-type";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import styled from "@emotion/styled";

const TaskTypeIcon = ({ id }: { id: number }) => {
    const { data: taskTypes } = useTaskTypes();
    const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
    if (!name) {
        return null;
    }
    return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTasksModal();
    const { name: keyword } = useTasksSearchParams();
    return (
        <Card
            onClick={() => startEdit(task.id)}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={task.id}
        >
            <p>
                <Mark keyword={keyword} name={task.name} />
            </p>
            <TaskTypeIcon id={task.typeId} />
        </Card>
    );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
    const { data: allTasks } = useTasks(useTasksSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
    return (
        <Container>
            <Row between={true}>
                <h3>{kanban.name}</h3>
                <More kanban={kanban} />
            </Row>
            <TasksContainer>
                {tasks?.map((task) => (
                    <TaskCard task={task} />
                ))}
                <CreateTask kanbanId={kanban.id} />
            </TasksContainer>
        </Container>
    );
};

//看板删除组件
const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
    const startDelete = () => {
        Modal.confirm({
            okText: "确定",
            cancelText: "取消",
            title: "确定删除看板吗",
            onOk() {
                return mutateAsync({ id: kanban.id });
            },
        });
    };
    const overlay = (
        <Menu>
            <Menu.Item>
                <Button type={"link"} onClick={startDelete}>
                    删除
                </Button>
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={overlay}>
            <Button type={"link"}>...</Button>
        </Dropdown>
    );
};

export const Container = styled.div`
   min-width: 27rem;
   border-radius: 6px;
   background-color: rgb(244, 245, 247);
   display: flex;
   flex-direction: column;
   padding: 0.7rem 0.7rem 1rem;
   margin-right: 1.5rem;
 `;

const TasksContainer = styled.div`
   overflow: scroll;
   flex: 1;
   ::-webkit-scrollbar {
     display: none;
   }
 `;