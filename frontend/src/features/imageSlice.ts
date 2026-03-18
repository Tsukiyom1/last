import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IImage } from "../interfaces/IImage.interface";
import { instance } from "../api/instance";

interface IState {
	images: IImage[];
	isLoading: boolean;
	error: Error | null;
}

const initialState: IState = {
	images: [],
	isLoading: false,
	error: null,
};

export const getImages = createAsyncThunk("image/get", async () => {
	const response = await instance.get("/image");
	return response.data;
});

export const postImages = createAsyncThunk(
	"image/post",
	async (payload: FormData) => {
		const response = await instance.post("/image", payload);
		return response.data;
	},
);

export const deleteImage = createAsyncThunk(
	"image/delete",
	async (id: number) => {
		await instance.delete(`/image/${id}`);
		return id;
	},
);

const imageSlice = createSlice({
	name: "image",
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(postImages.pending, state => {
				state.isLoading = true;
			})
			.addCase(postImages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.images = action.payload;
			})
			.addCase(postImages.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as Error;
			})
			.addCase(getImages.pending, state => {
				state.isLoading = true;
			})
			.addCase(getImages.fulfilled, (state, action) => {
				state.isLoading = false;
				state.images = action.payload;
			})
			.addCase(getImages.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as Error;
			});
	},
});

export default imageSlice;
