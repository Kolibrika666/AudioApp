import type { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./styles.css"
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { UserApi } from "../user.api";
import type { UserUpdateVm, UserVm } from "../user.models";

interface IUpdateForm {
    name: string,
    lastName: string,
    age: number,
}

interface UpdateUserModalProps {
    showState: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    user: UserVm;
}


export const UserUpdateModal = ({ setShow, showState, user }: UpdateUserModalProps) => {
    const handleClose = () => setShow(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IUpdateForm>({ reValidateMode: "onSubmit", defaultValues: {...user}});

    const onSubmit: SubmitHandler<IUpdateForm> = (data) => {
        const updateVm: UserUpdateVm = {
            name: data.name,
            lastName: data.lastName,
            age: Number(data.age),
        };
        UserApi.updateUser(user.id, updateVm)
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
                    <Form id="UpdateForm">
                        <input {...register("name", { required: true })} placeholder="Name" />
                        <input {...register("lastName", { required: true })} placeholder="Last name" />
                        <input {...register("age", { required: true })} placeholder="Age" />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button onClick={handleSubmit(onSubmit)} form="UpdateForm" variant="primary">Update</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    </>
}