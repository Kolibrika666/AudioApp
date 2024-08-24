import { useEffect } from "react";
import s from "./UserFilters.module.scss"

import { userActions, userSelectors } from "../userSlice";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { numberArray } from "../../shared/hooks";
import { useActionCreators } from "../../store";
import { BaseSearch, BaseSelect, type FormOption } from "../../shared/ui";


const optionsAge = numberArray(100).map<FormOption<number>>((i) => ({ label: String(i), value: i }));

export const UserFilters = () => {
    const actions = useActionCreators(userActions);
    const filterName = useSelector(userSelectors.filterName)
    const filterAge = useSelector(userSelectors.filterAge)
    const skip = useSelector(userSelectors.skipPagination)
    const take = useSelector(userSelectors.takePagination)
    const onSearchChange = (query?: string) => {
        actions.setFilterName(query)
    }

    const onSelectChange = (query?: FormOption<number>) => {
        actions.setFilterAge(query?.value)
    }

    const onSelectReset = () => {
        actions.setFilterAge()
    }

    useEffect(() => {
        actions.getUserList({ params: { name: filterName, age: filterAge } })
    }, [filterName, filterAge])

    return (
        <Form className={s.search} defaultValue="name">
            <BaseSearch onChange={onSearchChange} />
            <BaseSelect options={optionsAge} onChange={onSelectChange} label="" />
            <button onClick={onSelectReset}>X</button>
        </Form>
    )
} 