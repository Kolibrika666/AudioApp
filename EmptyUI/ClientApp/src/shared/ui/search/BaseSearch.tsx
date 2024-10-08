import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks";
import { Form } from "react-bootstrap";
import s from "./BaseSearch.module.scss"
interface SearchProps<T> {
    onChange: (query?: string) => void;
    value?: string;
    debounceTimeOut?: number;
    label?: string;
}
export function BaseSearch<T>({ onChange, value, debounceTimeOut = 500, label = 'Search' }: SearchProps<T>) {

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
        <div className={s.search}>
            <Form.Floating className="mb-2">
                <Form.Control
                    id="floatingInputCustom"
                    type="search"
                    placeholder="name"
                    onChange={onHandleChange}
                />
                <label htmlFor="floatingInputCustom">Search</label>
            </Form.Floating>
        </div>
    )
} 