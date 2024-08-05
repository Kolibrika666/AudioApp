export interface IUserFilterVm {
    query?: string;
    totalCount: number;
}

export interface UserVm {
    id: number;
    name: string;
    lastName: string;
    age: number;
}
