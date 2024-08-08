import { Button } from "react-bootstrap"
import type { UserCreateVm, UserUpdateVm, UserVm } from "../user.models"
import { UserUpdateModal } from "./UserUpdateModal"
import { UserApi } from "../user.api"
import { useState } from "react"

interface UserRowProps {
    users: Array<UserVm>
}

export const UserRow = ({ users }: UserRowProps) => {

    const [show, setShow] = useState(false);

    const openUpdateUserModal = () => {
        setShow(true)
    }

    const deleteUser = (id: number) => {
        console.log(id)
        UserApi.deleteUser(id)
            .then(res => {
                console.log(res)
            })
    }
    return <>
        {
            users.map(x =>
                <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.age}</td>
                    <td>
                        <Button onClick={openUpdateUserModal}>Edit</Button>
                        <Button onClick={() => deleteUser(x.id)}>Remove</Button>
                        {show? <UserUpdateModal showState={show} setShow={setShow} user={x} /> : null}
                    </td>
                </tr>
            )
        }
    </>
}
