import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "screens/project-list/util";

export const ProjectModal = () => {
    const { projectModalOpen, close } = useProjectModal();
    //visible:弹窗是否展示
    return (
        <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
            <h1>Project Modal</h1>
            <Button onClick={close}>关闭</Button>
        </Drawer>
    );
};