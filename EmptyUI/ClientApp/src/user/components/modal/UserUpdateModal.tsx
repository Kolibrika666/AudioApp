import { Button, Form, Modal } from "react-bootstrap";
import type { SubmitHandler } from "react-hook-form";
import { useFieldArray, useForm } from "react-hook-form";
import { UserApi } from "../../user.api";
import { UserRoleEnum, type ICheckBox, userRolesCheckBoxses, type UserUpdateVm } from "../../user.models";
import { userActions, userSelectors } from "../../userSlice";
import { useSelector } from "react-redux";
import s from "./UserModal.module.scss"
import { useActionCreators } from "../../../store";

interface IUpdateForm {
    name: string,
    lastName: string,
    age: number | string,
    roles: ICheckBox<UserRoleEnum>[],
}

const userRoles = (role: UserRoleEnum) => {
    let checkBox: ICheckBox<UserRoleEnum>[] = userRolesCheckBoxses;
    if (role != 0) {
        if (role & 1) checkBox[1].isCheck = true;
        if (role & 2) checkBox[2].isCheck = true;
        if (role & 4) checkBox[3].isCheck = true;
        if (role & 8) checkBox[4].isCheck = true;
    } else {
        checkBox[0].isCheck = true;;
    }
    console.log(checkBox)
    return checkBox;
}

export const UpdateUserModal = () => {

    const actions = useActionCreators(userActions)
    const show = useSelector(userSelectors.showUpdateUserModal)
    const user = useSelector(userSelectors.user)

    const handleClose = () => {
        actions.setChange(1);
        actions.setShowUpdateUserModal(false);
    };

    const { register, handleSubmit, watch, control, formState: { errors } } =
        useForm<IUpdateForm>({
            reValidateMode: "onSubmit",
            defaultValues: {
                name: user.name,
                lastName: user.lastName,
                age: user.age,
                roles: userRoles(user.role),
            }
        })

    const { fields } = useFieldArray<IUpdateForm>({
        control,
        name: "roles",
    });

    const onSubmit: SubmitHandler<IUpdateForm> = (data) => {
        let roles: UserRoleEnum = 0;
        data.roles.forEach((e) => {
            if (e.isCheck) roles |= e.id
        })
        const updateVm: UserUpdateVm = {
            id: user.id,
            name: data.name,
            lastName: data.lastName,
            age: Number(data.age),
            role: roles,
        };
        UserApi.updateUser(user.id, updateVm)
            .then(res => {
                console.log(res)
            }).finally(() => handleClose())
    };

    return <>
        <Modal show={show}
            onHide={handleClose} >
            <Modal.Dialog >
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Update name, last name and age</p>
                    <Form id="UpdateForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.inputGroup}>
                            <input {...register("name", { required: true })} placeholder="Name" />
                            <input {...register("lastName", { required: true })} placeholder="Last name" />
                            <input {...register("age", { required: true })} placeholder="Age" />
                        </div>
                        <p>Update role</p>
                        <div
                            className={s.formGroup}
                        >

                            {fields.map((field, index) => (
                                <article key={field.id}>
                                    <Form.Label key={field.label}>{field.label}</Form.Label>
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
                    <Button type="submit" form="UpdateForm" variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    </>
}
