import 'bootstrap/dist/css/bootstrap.min.css';
import { UserTable } from "./features/user/components";
import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { UserApi } from './features/user/user.api';
import { AddUserModal } from './features/user/components/UserAddModal';


export const App = () => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const createUser = (event : any) => UserApi.createUser();


    return <>
        <Button variant="primary" onClick={handleOpen} >Add user</Button>
        <AddUserModal showState={show} setShow={setShow} />
        <UserTable />
    </>;
};

