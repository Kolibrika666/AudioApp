import { Button } from "react-bootstrap"
import { userActions, userSelectors } from "./userSlice"
import { useSelector } from "react-redux"
import s from "./UserPage.module.scss"
import { AddUserModal } from "./components/modal/UserAddModal"
import { UserTable } from "./components/table/UserTable"
import { UserFilters } from "./components/UserFilters"
import { useEffect } from "react"
import { useActionCreators } from "../store"
import { Load } from "../shared/ui"


export const UserPage = () => {

    const actions = useActionCreators(userActions)
    const isloading = useSelector(userSelectors.isLoading)

    const handleOpen = () => actions.setShowAddUserModal(true);

    useEffect(() => {
        actions.getUserList({ params: {} })
    }, []);

    return (
        <div className={s.userPage}>
            <article>
                <h3>User list</h3>
                <Button variant="secomdary" onClick={handleOpen} >+Add user</Button>
            </article>
            <UserFilters />
            <AddUserModal />
            <UserTable />
            {/*<BasePagination />*/}
            {(isloading) ? <Load/> : null}
        </div>
    )
} 