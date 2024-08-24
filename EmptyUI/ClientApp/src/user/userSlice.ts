import { asyncThunkCreator, buildCreateSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserFilterVm, UserVm } from "./user.models";
import { UserApi } from "./user.api";

interface IState {
    showAddUserModal: boolean;
    showUpdateUserModal: boolean;
    isLoading: boolean;
    isError: boolean;
    userList: UserVm[];
    totalCount: number;
    filterName?: string;
    filterAge?: number;
    skipPagination: number;
    takePagination: number;
};

const initialState: IState = {
    showAddUserModal: false,
    showUpdateUserModal: false,
    isLoading: false,
    isError: false,
    userList: [],
    totalCount: 0,
    skipPagination: 1,
    takePagination: 10,
};

export const buildAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
})

export const userSlice = buildAppSlice({
    name: 'User',
    initialState,
    reducers: creator => ({
        setShowAddUserModal: creator.reducer((state, action: PayloadAction<boolean>) => {
            state.showAddUserModal = action.payload;
        }),
        setShowUpdateUserModal: creator.reducer((state, action: PayloadAction<boolean>) => {
            state.showUpdateUserModal = action.payload;
        }),
        setIsLoading: creator.reducer((state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }),
        getUserList: creator.asyncThunk(
            (request: { params: IUserFilterVm }, { rejectWithValue }) =>

                UserApi.getList(request.params).then(r => r.data).catch(r => rejectWithValue(r)),
            {
                pending: (state) => {
                    state.isLoading = true;
                },
                rejected: (state) => {
                    state.isError = true;
                },
                fulfilled: (state, { payload: userList }) => {
                    state.userList = userList.users;
                    state.totalCount = userList.totalCount
                    state.isLoading = false;
                }
            }
            
        ),
        setFilterName: creator.reducer((state, action: PayloadAction<string | undefined>) => {
            state.filterName = action.payload;
        }),
        setFilterAge: creator.reducer((state, action: PayloadAction<number | undefined>) => {
            state.filterAge = action.payload;
        }),
        setSkipPagination: creator.reducer((state, action: PayloadAction<number>) => {
            state.skipPagination = action.payload;
        }),
        setTakePagination: creator.reducer((state, action: PayloadAction<number>) => {
            state.takePagination = action.payload;
        }),

    }),
    selectors: {
        showAddUserModal: state => state.showAddUserModal,
        showUpdateUserModal: state => state.showUpdateUserModal,
        isLoading: state => state.isLoading,
        isError: state => state.isError,
        userList: state => state.userList,
        filterName: state => state.filterName, 
        filterAge: state => state.filterAge,
        skipPagination: state => state.skipPagination,
        takePagination: state => state.takePagination,
        totalCount: state => state.totalCount,
    }
});



export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;