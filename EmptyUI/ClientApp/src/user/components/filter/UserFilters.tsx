import { useEffect } from "react";
import s from "./UserFilters.module.scss"
import { userActions, userSelectors } from "../../userSlice";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { numberArray } from "../../../shared/hooks";
import { useActionCreators } from "../../../store";
import { BaseMultiSelect, BaseSearch, BaseSelect, type FormMultiOption, type FormOption } from "../../../shared/ui";
import { UserRoleEnum } from "../../user.models";

const optionsAge = numberArray(100).map<FormOption<number>>((i) => ({ label: String(i), value: i }));

const optionsRole: FormMultiOption<UserRoleEnum>[] = [
    { value: UserRoleEnum.Tester, label: 'Dev' },
    { value: UserRoleEnum.Dev, label: 'Tester' },
    { value: UserRoleEnum.Manager, label: 'Manager' },
    { value: UserRoleEnum.Customer, label: 'Customer' },
];

export const UserFilters = () => {

    const actions = useActionCreators(userActions);
    const filterName = useSelector(userSelectors.filterName);
    const filterAge = useSelector(userSelectors.filterAge);
    const skip = useSelector(userSelectors.skipPagination);
    const take = useSelector(userSelectors.takePagination);
    const shange = useSelector(userSelectors.change);
    const filterRole = useSelector(userSelectors.filterRole);

    useEffect(() => {
        actions.getUserList({ params: { name: filterName, age: filterAge, role: filterRole, skip: skip, take: take } })
    }, [filterName, filterAge, skip, take, filterRole, shange]);

    const onSearchChange = (query?: string) => {
        actions.setFilterName(query)
        actions.setResetcounter()
    };

    const onSelectChange = (query?: FormOption<number>) => {
        actions.setFilterAge(query?.value)
        actions.setResetcounter()
    };

    const onMultiSelectChange = (query?: FormMultiOption<UserRoleEnum>[]) => {
        const values = query?.reduce(
            (accumulator: UserRoleEnum, currentValue) => accumulator | currentValue.value,
            0,);
        actions.setResetcounter()
        actions.setFilterRole(values)
        if (values == 0) actions.setFilterRole(undefined)
        else {
            actions.setFilterRole(values)
        };
    }

    return (
        <Form className={s.search} defaultValue="name">
            <BaseSearch onChange={onSearchChange} />
            <BaseSelect options={optionsAge} onChange={onSelectChange} label="" />
            <BaseMultiSelect options={optionsRole} onChange={onMultiSelectChange} label="" />
        </Form>
    )
} 