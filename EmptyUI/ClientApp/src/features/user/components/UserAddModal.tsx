import type { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./styles.css"
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { UserApi } from "../user.api";
import type { UserCreateVm, UserVm } from "../user.models";

interface ICreateForm {
    name: string,
    lastName: string,
    age: number,
}

interface AddUserModalProps {
    showState: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}


export const AddUserModal = ({ setShow, showState }: AddUserModalProps) => {
    const handleClose = () => setShow(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ICreateForm>({
    });

    const onSubmit: SubmitHandler<ICreateForm> = (data) => {
        const createVm: UserCreateVm = {
            name: data.name,
            lastName: data.lastName,
            age: Number(data.age),
        }
        UserApi.createUser(createVm)
            .then(res => {
                console.log(res)
            }).finally(() => handleClose())
    };

    return <>
        <Modal show={showState}
            onHide={handleClose}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Input name, last name and age</p>
                    <form id="AddForm" onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("name", { required: true })} placeholder="Name" />
                        <input {...register("lastName", { required: true })} placeholder="Last name" />
                        <input {...register("age", { required: true })} placeholder="Age" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button type="submit" form="AddForm" variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    </>
}