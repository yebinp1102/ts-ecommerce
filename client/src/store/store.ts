import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./features/ProductSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import UserSlice from "./features/UserSlice";

export const store = configureStore({
  reducer: {
    product: ProductSlice,
    user: UserSlice
  }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;