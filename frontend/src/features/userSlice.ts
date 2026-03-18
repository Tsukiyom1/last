import { AxiosError, isAxiosError } from "axios";
import { instance } from "../api/instance";
import type { IUser } from "../interfaces/IUser.interface";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";
interface userState {
	userInfo: IUser | null;
	loading: boolean;
	registerError: null | string | userResponseValidateError;
	loginError: null | string;
}

type userResponseValidateError = { type: string; messages: string[] };
type userResponseError = {
	error: { message: string };
};

type userRequest = {
	username: string;
	displayName?: string;
	password: string;
};

const initialState: userState = {
	userInfo: null,
	registerError: null,
	loginError: null,
	loading: false,
};

export const registerUser = createAsyncThunk<
	IUser,
	userRequest,
	{ rejectValue: userResponseValidateError | userResponseError }
>("user/register", async (userData, { rejectWithValue }) => {
	try {
		const response = await instance.post<IUser>("/auth/register", userData);
		return response.data;
	} catch (e) {
		if (isAxiosError(e)) {
			const error: AxiosError<userResponseError> = e;
			return rejectWithValue(
				error.response?.data || {
					error: { message: "An error occurred" },
				},
			);
		}
		throw e;
	}
});

export const loginUser = createAsyncThunk<
	IUser,
	userRequest,
	{ rejectValue: string }
>("auth.login", async (userData, { rejectWithValue }) => {
	try {
		const response = await instance.post<IUser>("/auth/sign-in", userData);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<userResponseError> = err;
			return rejectWithValue(
				error.response?.data?.error?.message || "Internet connection error",
			);
		}
		throw err;
	}
});

export const logoutUser = createAsyncThunk(
	"auth/logout",
	async (_, { rejectWithValue, getState }) => {
		const token = (getState() as RootState).user.userInfo?.token;
		try {
			const response = await instance.delete("/auth/logout", {
				headers: {
					Authorization: token,
				},
			});

			return response.data;
		} catch (err) {
			if (isAxiosError(err)) {
				const error: AxiosError<userResponseError> = err;
				return rejectWithValue(
					error.response?.data?.error?.message || "Internet connection error",
				);
			}
			throw err;
		}
	},
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(registerUser.pending, state => {
				state.loading = true;
				state.registerError = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.userInfo = { ...action.payload };
				state.loading = false;
				state.registerError = null;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				if (Array.isArray(action.payload)) {
					state.registerError = action.payload as never;
				} else {
					state.registerError =
						(action.payload as userResponseError)?.error?.message ??
						"Error occurred";
				}
			})
			.addCase(loginUser.pending, state => {
				state.loading = true;
				state.loginError = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.loginError = null;
				state.userInfo = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.loginError = action.payload || null;
			})
			.addCase(logoutUser.fulfilled, () => initialState)
			.addCase(logoutUser.rejected, () => initialState);
	},
});

export default userSlice;
