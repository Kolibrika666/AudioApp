import { Button } from "react-bootstrap"
import type {UserVm } from "../../user.models"
import { UserApi } from "../../user.api"
import { userActions, userSelectors } from "../../userSlice"
import { useSelector } from "react-redux"
import s from "./UserTable.module.scss"
import { UserUpdateModal } from "../modal/UserUpdateModal"
import { useActionCreators } from "../../../store"

export const UserRow = () => {
    const actions = useActionCreators(userActions)
    const show = useSelector(userSelectors.showUpdateUserModal)
    const userList = useSelector(userSelectors.userList)

    const openUpdateUserModal = (x: UserVm) => {
        actions.setUser(x)
        actions.setShowUpdateUserModal(true);
    }
    const deleteUser = (id: number) => {

        UserApi.deleteUser(id)
            .then(() => {
                actions.setIsLoading(true);
            }).finally(() => actions.setShange(1))
    };
    return (<>
        {
            userList.map(x =>
                <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.age}</td>
                    <td>
                        <button onClick={() => openUpdateUserModal(x)} className={s.editButton}></button>
                        <button onClick={() => deleteUser(x.id)} className={s.removeButton}></button>
                        {show? <UserUpdateModal/> : null}
                    </td>
                </tr>
            )
        }
    </>
    )
}
