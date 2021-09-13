
//鼠标放在左上角项目上显示的页面

import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () => {
    const { data: projects, isLoading } = useProjects();  //获取list数据
    const pinnedProjects = projects?.filter((project) => project.pin); //获取已经收藏的项目
    const { open } = useProjectModal();
    const content = (
        <ContentContainer>
            <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
            <List>
                {pinnedProjects?.map((project) => (
                    <List.Item key={project.id}>
                        <List.Item.Meta title={project.name} />
                    </List.Item>
                ))}
            </List>
            <Divider />
            <ButtonNoPadding onClick={open} type={"link"}>
                创建项目
            </ButtonNoPadding>
        </ContentContainer>
    );

    return (
        <Popover placement={"bottom"} content={content}>
            <span>项目</span>
        </Popover>
    );
};

const ContentContainer = styled.div`
   min-width: 30rem;
 `;