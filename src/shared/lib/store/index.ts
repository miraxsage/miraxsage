import { configureStore } from "@reduxjs/toolkit";
import appearanceSlice, {
    listener as appearanceListener,
} from "./appearanceSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const makeStore = () =>
    configureStore({
        reducer: {
            appearance: appearanceSlice,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().prepend(appearanceListener),
    });

const store = makeStore();

export type Store = ReturnType<typeof store.getState>;
type UseStoreSelector = TypedUseSelectorHook<Store>;
type UseStoreDispatch = () => typeof store.dispatch;

export default store;
export const useStoreSelector: UseStoreSelector = useSelector;
export const useStoreDispatch: UseStoreDispatch = useDispatch;
