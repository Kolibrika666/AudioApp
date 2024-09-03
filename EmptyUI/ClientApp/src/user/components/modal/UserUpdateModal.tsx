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

    const actions = useActionCreators(userActions);
    const show = useSelector(userSelectors.showUpdateUserModal);
    const user = useSelector(userSelectors.user);

    const handleClose = () => {
        actions.setChange();
        actions.setShowUpdateUserModal(false);
    };

    const { register, handleSubmit, watch, control, formState: { errors, isValid } } =
        useForm<IUpdateForm>({
            reValidateMode: "onSubmit",
            mode: "onBlur",
            defaultValues: {
                name: user.name,
                lastName: user.lastName,
                age: user.age,
                roles: userRoles(user.role),
            }
        });

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
                            <input {...register("name", {
                                required: 'Поле обязательно к заполнению',
                                pattern: / [A - Za - z]{ 3} /,
                                minLength: {
                                    value: 2,
                                    message: "Минимум 2 символа",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Максимум 12 символов",
                                },
                            })}
                                placeholder="Name" />
                            {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                            <input {...register("lastName", {
                                required: 'Поле обязательно к заполнению',
                                pattern: / [A - Za - z]{ 3} /,
                                minLength: {
                                    value: 2,
                                    message: "Минимум 2 символа",
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Максимум 12 символов",
                                },
                            })}
                                placeholder="Last name" />
                            {errors?.lastName && <p>{errors?.lastName?.message || "Error!"}</p>}
                            <input {...register("age", {
                                required: 'Поле обязательно к заполнению',
                                pattern: / ^(1[89]|[2-9]\d)$ /,
                                minLength: {
                                    value: 1,
                                    message: "Минимум 1 символ",
                                },
                                maxLength: {
                                    value: 2,
                                    message: "Максимум 2 символа",
                                },
                            })} placeholder="Age" />
                            {errors?.age && <p>{errors?.age?.message || "Error!"}</p>}
                        </div>
                        <p>Update role</p>
                        <div className={s.formGroup}>
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

