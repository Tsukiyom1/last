/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { constants } from "../constants/constance";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

type AppStore = Store<RootState>;

export const instance = axios.create({
	baseURL: constants,
});

let appStore: AppStore;

export const appInjectStore = (store: AppStore) => {
	appStore = store;
};

instance.interceptors.request.use(config => {
	try {
		config.headers.Authorization = appStore.getState().user.userInfo?.token;
	} catch (error) {
		//
	}

	return config;
});
