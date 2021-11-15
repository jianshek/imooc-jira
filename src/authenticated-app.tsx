//已登录的起始页
import {useState} from "react";
import {ProjectListScreen} from "screens/project-list";
import {useAuth} from "context/auth-context";
import styled from "@emotion/styled";
import {ButtonNoPadding, Row} from "components/lib";
import {ReactComponent as SoftwareLogo} from "assets/software-logo.svg";
import {Button, Dropdown, Menu} from "antd";
import {Navigate, Route, Routes} from "react-router";
import {ProjectScreen} from "screens/project";
import {resetRoute} from "utils";
import {ProjectModal} from "components/project-modal";
import {ProjectPopover} from "components/project-popover";
import { UserPopover } from "components/user-popover";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export default function AuthenticatedApp() {
    return (
        <Container>
                <PageHeader />
                <Main>
                    <Routes>
                        <Route path={"/projects"} element={<ProjectListScreen />} />
                        <Route
                            path={"/projects/:projectId/*"}
                            element={<ProjectScreen />}
                        />
                        <Navigate to={"/projects"} />
                    </Routes>
                </Main>
                <ProjectModal />
        </Container>
    );
};

//SoftwareLogo:使用svg渲染,而不是使用image标签,svg可以自定义样式
const PageHeader = () => {

    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={"link"} onClick={resetRoute}>
                    <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"}/>
                </ButtonNoPadding>
                <ProjectPopover />
                <UserPopover />
            </HeaderLeft>
            <HeaderRight>
                <User/>
            </HeaderRight>
        </Header>
    );
};

const User = () => {
    const {logout, user} = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={"logout"}>
                        <Button onClick={logout} type={"link"}>
                            登出
                        </Button>
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={"link"} onClick={(e) => e.preventDefault()}>
                Hi, {user?.name}
            </Button>
        </Dropdown>
    );
};

/*
grid网格布局
* grid-template-rows: 6rem 1fr;横向,左边6rem,右边自动填充
* */
const Container = styled.div`
   display: grid;
   grid-template-rows: 6rem 1fr;
   height: 100vh;
 `;

// grid-area 用来给grid子元素起名字,(Row)使用自定义的Row,所以用括号括起来
const Header = styled(Row)`
   padding: 3.2rem;
   box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
   z-index: 1;
 `;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
   display: flex;
   overflow: hidden;
 `;