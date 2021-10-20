import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import {
    useProjectModal,
    useProjectsQueryKey,
} from "screens/project-list/util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
    const {
        projectModalOpen,
        close,
        editingProject,
        isLoading,
    } = useProjectModal();
    const useMutateProject = editingProject ? useEditProject : useAddProject;
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
        useProjectsQueryKey()
    );
    const [form] = useForm();
    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields(); //重置输入框里的值
            close();
        });
    };
    const closeModal = () => {
        form.resetFields();
        close();
    };

    const title = editingProject ? "编辑项目" : "创建项目";

    useEffect(() => {
        form.setFieldsValue(editingProject);  //设置输入框的值
    }, [editingProject, form]);

    //forceRender:强制渲染,页面上条件使用了该组件,在页面渲染的时候,该组件也渲染
    return (
        <Drawer
            forceRender={true}
            onClose={closeModal}
            visible={projectModalOpen}
            width={"100%"}
        >
            <Container>
                {isLoading ? (
                    <Spin size={"large"} />
                ) : (
                    <>
                        <h1>{title}</h1>
                        <ErrorBox error={error} />
                        <Form
                            form={form}
                            layout={"vertical"}
                            style={{ width: "40rem" }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                label={"名称"}
                                name={"name"}
                                rules={[{ required: true, message: "请输入项目名" }]}
                            >
                                <Input placeholder={"请输入项目名称"} />
                            </Form.Item>

                            <Form.Item
                                label={"部门"}
                                name={"organization"}
                                rules={[{ required: true, message: "请输入部门名" }]}
                            >
                                <Input placeholder={"请输入部门名"} />
                            </Form.Item>

                            <Form.Item label={"负责人"} name={"personId"}>
                                <UserSelect defaultOptionName={"负责人"} />
                            </Form.Item>

                            <Form.Item style={{ textAlign: "right" }}>
                                <Button
                                    loading={mutateLoading}
                                    type={"primary"}
                                    htmlType={"submit"}
                                >
                                    提交
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Container>
        </Drawer>
    );
};

const Container = styled.div`
   height: 80vh;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
 `;