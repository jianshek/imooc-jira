//select选择,id返回number类型

import { Raw } from "types";
import { Select } from "antd";

//React.ComponentProps<typeof 组件名>; 获取组件的所有属性
type SelectProps = React.ComponentProps<typeof Select>;

//Omit:删除select原有的value,onChange,options属性,使用自定义的相同属性覆盖
interface IdSelectProps extends Omit<SelectProps, "value" | "onChange" | "options"> {
    value?: Raw | null | undefined;
    onChange?: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
    //...restProps:其他的select默认属性
    const { value, onChange, defaultOptionName, options, ...restProps } = props;
    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            onChange={(value) => onChange?.(toNumber(value) || undefined)}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map((option) => (
                <Select.Option key={option.id} value={option.id}>
                    {option.name}
                </Select.Option>
            ))}
        </Select>
    );
};

//非NaN返回0,其他返回number类型
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));