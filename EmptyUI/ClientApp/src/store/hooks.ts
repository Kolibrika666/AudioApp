import { bindActionCreators, type ActionCreator, type ActionCreatorsMapObject, type AsyncThunk } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./store";

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
    ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export type BoundActions<Actions extends ActionCreatorsMapObject> = {
    [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

export const useActionCreators = <Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;