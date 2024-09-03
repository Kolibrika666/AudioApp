import type {UserRoleEnum, UserVm } from "../../user.models"
import { UserApi } from "../../user.api"
import { userActions, userSelectors } from "../../userSlice"
import { useSelector } from "react-redux"
import s from "./UserTable.module.scss"
import { UpdateUserModal} from "../modal/UserUpdateModal"
import { useActionCreators } from "../../../store"
import { Button } from "react-bootstrap"

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
            }).finally(() => actions.setChange(1))
    };

    const userRoles = (role: UserRoleEnum) => {
        let arr: string[] = [];
        if (role != 0) {
            if (role & 1) arr.push('tester')
            if (role & 2) arr.push('dev')
            if (role & 4) arr.push('manager')
            if (role & 8) arr.push('castumer')
        } else {
            arr.push('none'); 
        }
        return arr
    }
    return (<>
        {
            userList.map(x =>
                <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.age}</td>
                    <td>{userRoles(x.role).map((e) => 
                        <span key={e}>{e}</span>
                    )}</td>
                    <td>
                        <Button onClick={() => openUpdateUserModal(x)} className={s.editButton} ></Button>
                        <Button onClick={() => deleteUser(x.id)} className={s.removeButton}></Button>
                        {show? <UpdateUserModal/> : null}
                    </td>
                </tr>
            )
        }
    </>
    )
}
