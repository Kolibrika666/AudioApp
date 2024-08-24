import {  useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import { FloatingLabel, Form } from "react-bootstrap";
import s from "./BaseSearch.module.scss"


interface SearchProps<T> {
    onChange: (query?: string) => void;
    value?: string;
    debounceTimeOut?: number;
    label?: string;
}
export function BaseSearch<T>({onChange, value, debounceTimeOut = 500,  label = 'Search' }: SearchProps<T>) {
   
    const [query, setQuery] = useState<string | undefined>(value)
    const debouncedSearchTerm = useDebounce(query, debounceTimeOut);

    useEffect(() => {
        onChange(query)
    }, [debouncedSearchTerm]);

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuery(e.target.value)
    }

    return (
        <FloatingLabel label={label} className={s.label} >
            <Form.Control className={s.search} type="search" onChange={onHandleChange} />
        </FloatingLabel>
    )
} 