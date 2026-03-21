import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { instance } from "../api/instance";
import type { IPlace } from "../interfaces/IPlace.interface";

interface IState {
	places: IPlace[];
	isLoading: boolean;
	error: Error | null;
}

const initialState: IState = {
	places: [],
	isLoading: false,
	error: null,
};

export const getPlace = createAsyncThunk("place/get", async () => {
	const response = await instance.get<IPlace[]>("/places");
	return response.data;
});

export const postPlace = createAsyncThunk(
	"place/post",
	async (payload: FormData) => {
		const response = await instance.post<IPlace>("/places", payload);
		return response.data;
	},
);

export const getPlaceById = createAsyncThunk(
	"place/getById",
	async (id: number) => {
		const response = await instance.get<IPlace[]>(`/places/${id}`);
		return response.data;
	},
);

export const deletePlace = createAsyncThunk(
	"delete/place",
	async (id: number, thunkAPI) => {
		const { dispatch } = thunkAPI;
		const response = await instance.delete(`/places/${id}`);
		dispatch(getPlace());
		return response.data;
	},
);

const placeSlice = createSlice({
	name: "place",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getPlace.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPlace.fulfilled, (state, action) => {
				state.isLoading = false;
				state.places = action.payload;
			})
			.addCase(getPlace.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as Error;
			})
			.addCase(getPlaceById.pending, state => {
				state.isLoading = true;
			})
			.addCase(getPlaceById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.places = action.payload;
			})
			.addCase(getPlaceById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as Error;
			});
	},
});

export default placeSlice;
