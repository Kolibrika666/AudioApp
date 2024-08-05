import { Button } from "react-bootstrap"
import type { UserVm } from "../user.models"

interface UserRowProps {
    users: Array<UserVm>
}

export const UserRow = ({ users }: UserRowProps) => {
    return <>
        {
            users.map(x =>
                <tr key={x.id}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.age}</td>
                    <td>
                        <Button>Edit</Button>
                        <Button>Remove</Button>
                    </td>
                </tr>
            )
        }
    </>
}