import { Button, Form, Modal } from "react-bootstrap";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { UserApi } from "../../user.api";
import { UserRoleEnum, type UserCreateVm, type ICheckBox, userRolesCheckBoxses } from "../../user.models";
import { userActions, userSelectors } from "../../userSlice";
import { useSelector } from "react-redux";
import s from "./UserModal.module.scss"
import { useActionCreators } from "../../../store";

interface ICreateForm {
    name: string,
    lastName: string,
    age: number | string,
    roles: ICheckBox<UserRoleEnum>[]
}

export const AddUserModal = () => {

    const show = useSelector(userSelectors.showAddUserModal)
    const actions = useActionCreators(userActions)

    const handleClose = () => {
        reset({
            name: "",
            lastName: "",
            age: "",
            roles: fields,
        });
        actions.setShange(1);
        actions.setShowAddUserModal(false);
    };

    const { register, handleSubmit, watch, reset, control, formState: { errors } } = useForm<ICreateForm>({
        defaultValues: {
            roles: userRolesCheckBoxses,
        }
    });

    const { fields } = useFieldArray<ICreateForm>({
        control,
        name: "roles",
    });

    const onSubmit: SubmitHandler<ICreateForm> = (data) => {
        let roles: UserRoleEnum = 0;
        data.roles.forEach((e) => {
            if (e.isCheck) roles |= e.id
        })

        const createVm: UserCreateVm = {
            name: data.name,
            lastName: data.lastName,
            age: Number(data.age),
            role: roles,
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
            onHide={handleClose}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>Add user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Input name, last name and age</p>
                    <Form id="AddForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.inputGroup}>
                            <input {...register("name", { required: true })} placeholder="Name" />
                            <input {...register("lastName", { required: true })} placeholder="Last name" />
                            <input {...register("age", { required: true })} placeholder="Age" />
                        </div>
                        <p>Check role</p>
                        <div
                            className={s.formGroup}
                        >
                    
                            {fields.map((field, index) => (
                                <article key={field.id}>
                                    <Form.Label key={field.label} >{field.label}</Form.Label>
                                <Form.Check type="checkbox"
                                    key={field.id}
                                    {...register(`roles.${index}.isCheck`)}
                                />
                            </article>
                        ))}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button type="submit" form="AddForm" variant="danger">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    </>
}
