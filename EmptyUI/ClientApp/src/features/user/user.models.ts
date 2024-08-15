export interface IUserFilterVm {
    name?: string;
    age?: number;
}

export interface UserVm {
    id: number;
    name: string;
    lastName: string;
    age: number;
}

export interface UserCreateVm {
    name: string;
    lastName: string;
    age: number;
}

export interface UserUpdateVm {
    name: string;
    lastName: string;
    age: number;
}