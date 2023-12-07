import { createStore, applyMiddleware, combineReducers } from "redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk"; // Если вы планируете использовать асинхронные действия
import authReducer, { authSlice } from "./reducers/authSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
