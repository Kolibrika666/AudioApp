import { Button } from "react-bootstrap"
import type {UserVm } from "../user.models"
import { UserUpdateModal } from "./UserUpdateModal"
import { UserApi } from "../user.api"
import { userActions, userSelectors } from "../userSlice"
import { useActionCreators } from "../../../store"
import { useSelector } from "react-redux"
import s from "./UserTable.module.scss"
export const UserRow = () => {

    const { setShowUpdateUserModal, setIsLoading, getUserList} = useActionCreators(userActions)
    const show = useSelector(userSelectors.showUpdateUserModal)
    const userList = useSelector(userSelectors.userList)

    const openUpdateUserModal = () => setShowUpdateUserModal(true);

    const deleteUser = (id: number) => (
        UserApi.deleteUser(id)
            .then(() => setIsLoading(true))
            .finally(() => getUserList({ params: {} })
            ))
    return <>
        {
            userList.map(x =>
                <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.age}</td>
                    <td>
                        <button onClick={openUpdateUserModal} className={s.editButton}></button>
                        <button onClick={() => deleteUser(x.id)} className={s.removeButton}></button>
                        {show? <UserUpdateModal user={x} /> : null}
                    </td>
                </tr>
            )
        }
    </>
}
