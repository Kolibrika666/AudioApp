import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IState {
    showAddUserModal: boolean;
    showUpdateUserModal: boolean;
};

const initialState: IState = {
    showAddUserModal: false,
    showUpdateUserModal: false,
};

export const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers: creator => ({
        setShowAddUserModal: creator.reducer((state, action: PayloadAction<boolean>) => {
            state.showAddUserModal = action.payload;
        }),
        setShowUpdateUserModal: creator.reducer((state, action: PayloadAction<boolean>) => {
            state.showUpdateUserModal = action.payload;
        })
    })
})


export const { setShowAddUserModal, setShowUpdateUserModal } = userSlice.actions;
export const userReducer = userSlice.reducer;