import { useSelector } from "react-redux";
import type { UserUpdateVm, UserVm } from "../../user.models";
import { useActionCreators } from "../../../store";
import { userActions, userSelectors } from "../../userSlice";
import { useForm, type SubmitHandler } from "react-hook-form";
import { UserApi } from "../../user.api";
import { Button, Form, Modal } from "react-bootstrap";
import s from "./UserModal.module.scss"


interface IUpdateForm {
    name: string,
    lastName: string,
    age: number,
}

export const UserUpdateModal = () => {

    const show = useSelector(userSelectors.showUpdateUserModal)
    const user = useSelector(userSelectors.user)
    const actions = useActionCreators(userActions)
    const handleClose = () => {
        actions.setShange(1);
        actions.setShowUpdateUserModal(false);
    };

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<IUpdateForm>({ reValidateMode: "onSubmit", defaultValues: { ...user } });

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
        <Modal show={show}
            onHide={handleClose} className={s.modal}>
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
                    <Button onClick={handleSubmit(onSubmit)} form="UpdateForm" variant="danger">Update</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    </>
}