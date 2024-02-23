import { configureStore } from "@reduxjs/toolkit";
import appearanceSlice from "./appearanceSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        appearance: appearanceSlice,
    },
});

export type Store = ReturnType<typeof store.getState>;
type UseStoreSelector = TypedUseSelectorHook<Store>;
type UseStoreDispatch = () => typeof store.dispatch;

export default store;
export const useStoreSelector: UseStoreSelector = useSelector;
export const useStoreDispatch: UseStoreDispatch = useDispatch;
