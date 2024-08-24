import { Button, Modal } from "react-bootstrap";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { UserApi } from "../../user.api";
import type { UserCreateVm } from "../../user.models";
import { userActions, userSelectors } from "../../userSlice";
import { useSelector } from "react-redux";
import s from "./UserModal.module.scss"
import { useActionCreators } from "../../../store";

interface ICreateForm {
    name: string,
    lastName: string,
    age: number | string,
}

export const AddUserModal = () => {

    const show = useSelector(userSelectors.showAddUserModal)
    const actions = useActionCreators(userActions)

    const handleClose = () => (
        actions.getUserList({ params: {} }).finally(() => {
            actions.setShowAddUserModal(false)
            reset({
                name: "",
                lastName: "",
                age: "" ,
            })
        })
    );

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<ICreateForm>({
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
            }).finally(() => (
                handleClose()
               
            ))
        
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
                    <form id="AddForm" onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("name", { required: true })} placeholder="Name" />
                        <input {...register("lastName", { required: true })} placeholder="Last name" />
                        <input {...register("age", { required: true })} placeholder="Age"/>
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