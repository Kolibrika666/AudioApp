import { FloatingLabel } from "react-bootstrap";
import Select, { type MenuPlacement, type SingleValue } from 'react-select'
import s from "./BaseSelect.module.scss"
export interface FormOption<T> {
    readonly value: T;
    readonly label: string;
}
interface SelectProps<T> {
    onChange: (option: FormOption<T>) => void;
    value?: FormOption<T> | null;
    label?: string;
    options: FormOption<T>[];
    isClearable?: boolean;
    menuPlacement?: MenuPlacement;
}

export function BaseSelect<T>({ onChange, value, label = 'select', options, isClearable = true, menuPlacement = 'auto' }: SelectProps<T>) {

    return (
        <>
            <FloatingLabel label={label}>
                <Select
                    options={options}
                    onChange={(onChange as (single: SingleValue<FormOption<T>>) => void)}
                    value={value}
                    isClearable={isClearable}
                    menuPlacement={menuPlacement}
                    theme={(theme) => ({
                        ...theme,
                        border: 0,
                        colors: {
                            ...theme.colors,
                            primary25: 'rgb(248, 243, 241)',
                            primary: 'transperent',
                        },
                    })}
                    classNames={{
                        control: (state) =>
                            state.isFocused ? s.selectIsFocused : s.select,
                        container: (state) =>
                            state.isFocused ? s.containerIsFocused : s.container,
                    }}
                />
            </FloatingLabel>
        </>
    )
}

