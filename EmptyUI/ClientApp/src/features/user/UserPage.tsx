import { Button} from "react-bootstrap"
import { useActionCreators } from "../../store"
import { userActions, userSelectors } from "./userSlice"
import { useSelector } from "react-redux"
import { Load } from "../load"
import s from "./UserPage.module.scss"
import { AddUserModal } from "./components/modal/UserAddModal"
import { UserTable } from "./components/table/UserTable"
import { UserFilters } from "./components/UserSearch"

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
            <UserFilters/>
            <AddUserModal />
            <UserTable/>
            {(isloading) ? <Load /> : null}
        </div>
    )
} 