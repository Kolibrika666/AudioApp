
import { httpClient } from "../httpClient";
import type { IUserFilterVm, ListUserVm, UserCreateVm, UserUpdateVm, UserVm } from "./user.models";

const endpoints = {
    GET_LIST: "/User/GetList",
    CREATE_USER: "/User/Create",
    DELETE_USER: "/User/Delete",
    UPDATE_USER: "/User/Update"
}
export class UserApi {

    static getList(params?: IUserFilterVm) {
        return httpClient.get<ListUserVm>(endpoints.GET_LIST, { params });
    };

    static createUser(data?: UserCreateVm,) {
        return httpClient.post<UserVm>(endpoints.CREATE_USER, data);
    };

    static deleteUser(id: number) {
        return httpClient.delete<UserVm>(endpoints.DELETE_USER, { params: { id } });
    };
    static updateUser(id: number, data: UserUpdateVm) {
        return httpClient.put<UserVm>(endpoints.UPDATE_USER, data, { params: { userId: id } });
    };
}

