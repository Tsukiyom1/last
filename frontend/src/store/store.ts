import storage from "redux-persist/lib/storage";
import userSlice from "../features/userSlice";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { rootReducer } from ".";
import { configureStore } from "@reduxjs/toolkit";
import { appInjectStore } from "../api/instance";
import persistStore from "redux-persist/es/persistStore";
const persistConfig = {
	key: "root",
	storage,
	whiteList: [userSlice.name],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
});

appInjectStore(store);
export default store;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
