import 'bootstrap/dist/css/bootstrap.min.css';
import { UserTable } from "./features/user/components";
import { Button, Form, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { UserApi } from './features/user/user.api';
import { AddUserModal } from './features/user/components/UserAddModal';
import { Provider } from 'react-redux';
import { store } from './store';


export const App = () => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);


    return <>
        <Provider store={store}>
        <Button variant="primary" onClick={handleOpen} >Add user</Button>
        <AddUserModal showState={show} setShow={setShow} />
        <UserTable />
        </Provider>
    </>;
};

