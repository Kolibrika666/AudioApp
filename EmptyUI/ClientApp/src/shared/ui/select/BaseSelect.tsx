import { FloatingLabel} from "react-bootstrap";
import Select, { type SingleValue } from 'react-select'
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
}
export function BaseSelect<T>({ onChange, value, label = 'select', options }: SelectProps<T>) {

    return (
        <>
            <FloatingLabel label={label}>
                <Select
                    className={s.select}
                    options={options}
                    onChange={(onChange as (single: SingleValue<FormOption<T>>) => void)}
                    value={value} 
            />
        </FloatingLabel>
        </>
    )
} 

