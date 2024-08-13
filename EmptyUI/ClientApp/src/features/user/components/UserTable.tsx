import { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import type { UserVm } from "../user.models";
import { UserApi } from "../user.api";
import { UserRow } from "./UserRow";
import { useActionCreators } from "../../../store";
import { userActions, userSelectors } from "../userSlice";
import { useSelector } from "react-redux";
import s from "./UserTable.module.scss"

export const UserTable = () => {

    const { getUserList } = useActionCreators(userActions)

    useEffect(() => {
        getUserList({ params: {} })
    }, []);

    return <>
        <Table bordered hover className={s.userTable}>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
               <UserRow/>
            </tbody>
        </Table>
    </>
}
