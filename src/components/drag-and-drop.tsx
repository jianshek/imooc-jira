//看板和task拖拽
import React, { ReactNode } from "react";
import {
    Draggable,
    DraggableProps,
    Droppable,
    DroppableProps,
    DroppableProvided,
    DroppableProvidedProps,
} from "react-beautiful-dnd";  //拖拽使用的库

//去掉DroppableProps的children,添加新的children
type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

export const Drop = ({ children, ...props }: DropProps) => {  //放下,需要用Droppable包裹(具体参考react-beautiful-dnd的API)
    return (
        <Droppable {...props}>
            {(provided) => {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {  //复制传入的组件
                        ...provided.droppableProps,
                        ref: provided.innerRef,
                        provided,
                    });
                }
                return <div />;
            }}
        </Droppable>
    );
};

type DropChildProps = Partial<
    { provided: DroppableProvided } & DroppableProvidedProps
    > &
    React.HTMLAttributes<HTMLDivElement>;
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
    ({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
            {children}
            {props.provided?.placeholder}
        </div>
    )
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };
export const Drag = ({ children, ...props }: DragProps) => {  //拖拽,需要用Draggable包裹(具体参考react-beautiful-dnd的API)
    return (
        <Draggable {...props}>
            {(provided) => {
                if (React.isValidElement(children)) {
                    return React.cloneElement(children, {
                        ...provided.draggableProps,
                        ...provided.dragHandleProps,
                        ref: provided.innerRef,
                    });
                }
                return <div />;
            }}
        </Draggable>
    );
};