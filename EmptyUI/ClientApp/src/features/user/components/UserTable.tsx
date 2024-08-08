import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import type { UserVm } from "../user.models";
import { UserApi } from "../user.api";
import { UserRow } from "./UserRow";

export const UserTable = () => {

    const [users, setUsers] = useState<Array<UserVm>>([]);

    const [isLoading, seIsLoading] = useState(false);

    useEffect(() => {
        seIsLoading(true);

        UserApi.getList()
            .then(res => {
                setUsers(res.data);
            })
            .finally(() => {
                seIsLoading(false)
            });
    }, []);

    return <>
        <Table striped="columns" hover variant="dark">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    isLoading
                        ? '...Load'
                        : <UserRow users={users} />
                }
            </tbody>
        </Table>
    </>
}
