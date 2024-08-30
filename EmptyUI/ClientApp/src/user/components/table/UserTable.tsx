import { Table } from "react-bootstrap"
import { UserRow } from "./UserRow";
import s from "./UserTable.module.scss"

export const UserTable = () => {

    return <>
        <Table bordered hover className={s.userTable}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
               <UserRow/>
            </tbody>
        </Table>
    </>
}
