import { FloatingLabel } from "react-bootstrap";
import Select, { type MultiValue } from 'react-select'
import s from "./BaseSelect.module.scss"

export interface FormMultiOption<T> {
    readonly value: T;
    readonly label: string;
}
interface SelectProps<T> {
    onChange: (option: FormMultiOption<T>[]) => void;
    value?: FormMultiOption<T> | null;
    label?: string;
    options: FormMultiOption<T>[];
    isClearable?: boolean;
    onBlur?: () => void;
}
export function BaseMultiSelect<T>({ onChange, value, label = 'select', options, isClearable = true }: SelectProps<T>) {

    return (
        <>
            <FloatingLabel label={label}>
                <Select
                    isMulti
                    options={options}
                    onChange={(onChange as (multi: MultiValue<FormMultiOption<T>>) => void)}
                    value={value}
                    isClearable={isClearable}
                    closeMenuOnSelect={true}
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

