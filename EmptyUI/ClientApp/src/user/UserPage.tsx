import { userActions, userSelectors } from "./userSlice"
import { useSelector } from "react-redux"
import s from "./UserPage.module.scss"
import { useActionCreators } from "../store"
import { BasePagination, Load } from "../shared/ui"
import { Button } from "react-bootstrap"
import { AddUserModal, UserFilters, UserTable } from "./components"

export const UserPage = () => {

    const actions = useActionCreators(userActions);
    const isloading = useSelector(userSelectors.isLoading);
    const totalCount = useSelector(userSelectors.totalCount);
    const resetCounter = useSelector(userSelectors.resetCounter);

    const handleOpen = () => actions.setShowAddUserModal(true);

    const onPaginationChange = (skip: number, take: number) => {
        actions.setSkipPagination(skip)
        actions.setTakePagination(take)
    }

    return (
        <div className={s.userPage}>
            <article>
                <h3>User list</h3>
                <Button onClick={handleOpen} variant='primary'>+Add user</Button>
            </article>
            <UserFilters />
            <AddUserModal />
            <UserTable />
            <BasePagination totalCount={totalCount} onChange={onPaginationChange} pageSize={10} resetCounter={resetCounter} />
            {(isloading) ? <Load /> : null}
        </div>
    )
} 