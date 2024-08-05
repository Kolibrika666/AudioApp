import { httpClient } from "../../httpClient";
import type { IUserFilterVm, UserVm } from "./user.models";

const endpoints = {
    GET_LIST: "/User/GetList",
    CREATE_USER: "/User/Create"
}

export class UserApi {

    static getList(params?: IUserFilterVm,) {
        return httpClient.get<Array<UserVm>>(endpoints.GET_LIST, { params});
    };

    static createUser(params?: UserVm,) {
        return httpClient.post<undefined>(endpoints.CREATE_USER, { params });
    };
}