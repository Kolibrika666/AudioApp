export interface ListUserVm {
    users: UserVm[];
    totalCount: number;
}

export enum UserRoleEnum {
    None = 0,
    Dev = 1,
    Tester = 1<<1,
    Manager = 1<<2,
    Customer = 1<<3,
}
export interface IUserFilterVm {
    name?: string;
    age?: number;
    skip?: number;
    take?: number;
    role?: UserRoleEnum;
}

export interface UserVm {
    id: number;
    name: string;
    lastName: string;
    age: number;
    role?: UserRoleEnum;
}

export interface UserCreateVm {
    name: string;
    lastName: string;
    age: number;
    role?: UserRoleEnum;
}

export interface UserUpdateVm {
    id: number;
    name: string;
    lastName: string;
    age: number;
    role?: UserRoleEnum;
}

export interface ICheckBox<T> {
    id: T,
    label: string,
    isCheck: boolean,
}

export const userRolesCheckBoxses: ICheckBox<UserRoleEnum>[] = [
    {
        id: UserRoleEnum.None,
        label: 'none',
        isCheck: false,
    },
    {
        id: UserRoleEnum.Tester,
        label: 'tester',
        isCheck: false,
    },
    {
        id: UserRoleEnum.Dev,
        label: 'dev',
        isCheck: false,
    },
    {
        id: UserRoleEnum.Manager,
        label: 'manager',
        isCheck: false,
    },
    {
        id: UserRoleEnum.Customer,
        label: 'customer',
        isCheck: false,
    },
]

