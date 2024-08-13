import { Button, Form } from "react-bootstrap"
import { AddUserModal } from "./components/UserAddModal"
import { UserTable } from "./components"
import { useActionCreators } from "../../store"
import { userActions, userSelectors } from "./userSlice"
import { useSelector } from "react-redux"
import { Load } from "../load"
import s from "./UserPage.module.scss"

export const UserPage = () => {

    const { setShowAddUserModal } = useActionCreators(userActions)
    const isloading = useSelector(userSelectors.isLoading)
    const handleOpen = () => setShowAddUserModal(true);

    return (
        <div className={s.userPage}>
            <article>
                <h3>User list</h3>
                <Button variant="secomdary" onClick={handleOpen} >+Add user</Button>
            </article>
            <div className={s.search}>
                <input placeholder="Search" />
                <button className={s.buttonBackgroundImage}></button>
            </div>
            <AddUserModal />
            <UserTable />
            {(isloading) ? <Load /> : null}
        </div>
    )
} 