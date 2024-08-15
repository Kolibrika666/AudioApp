import { useCallback, useEffect, useState } from "react";
import s from "./UserSearch.module.scss"
import { numberArray, useDebounce } from "../../../shared/hooks";
import { UserApi } from "../user.api";
import { useActionCreators } from "../../../store";
import { userActions, userSelectors } from "../userSlice";
import { Form } from "react-bootstrap";
import { UserSearchAge } from "./UserSearchAge";
import { useSelector } from "react-redux";
import { BaseSearch, BaseSelect, type FormOption } from "../../../shared/ui";

const optionsAge = numberArray(100).map<FormOption<number>>((i) => ({ label: String(i), value: i }));


export const UserFilters = () => {
    const actions = useActionCreators(userActions);
    const filterName = useSelector(userSelectors.filterName)
    const filterAge = useSelector(userSelectors.filterAge)

    const onSearchChange = (query?: string) => {
        actions.setFilterName(query)
    }

    const onSelectChange = (query?: FormOption<number>) => {
       actions.setFilterAge(query?.value)
    }

    useEffect(() => {
        actions.getUserList({ params: { name: filterName, age: filterAge}})
    }, [filterName, filterAge])

    return (
        <Form className={s.search} defaultValue="name">
            <BaseSearch onChange={onSearchChange} />
            < BaseSelect options={optionsAge} onChange={onSelectChange} />
        </Form>
    )
} 