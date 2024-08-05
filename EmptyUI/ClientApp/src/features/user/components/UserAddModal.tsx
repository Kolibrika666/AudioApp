import type { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./styles.css"
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { UserApi } from "../user.api";

interface AddUserModalProps {
    showState: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

type Inputs = {
    name: string,
    lastName: string,
    age: number
};

export const AddUserModal = ({ setShow, showState }: AddUserModalProps) => {
    const handleClose = () => setShow(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: "",
            lastName: "",
            age: ""
        }
    });

    const f = () => {
       // isloading = true
     //   UserApi.createUser().then(
    }

    return <>
        <Modal show={showState}
            onHide={handleClose}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Input name, last name and age</p>
                    <form onSubmit={handleSubmit((data) => console.log(data))}>
                        <input {...register("name", { required: true })} placeholder="Name"/>
                        <input {...register("lastName", { required: true })} placeholder="Last name"/>
                        <input {...register("age", { required: true })} placeholder="Age"/>
                        <input type="submit"></input>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" /*onClick={createUser()}*/>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    </>
}