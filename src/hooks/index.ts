import { TypedUseSelectorHook, useDispatch, useSelector as useAppSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/configureStore";

//redux
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;
