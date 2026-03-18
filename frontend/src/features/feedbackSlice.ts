import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IFeedback } from "../interfaces/IFeedbac.interface";
import { instance } from "../api/instance";
import { getPlace } from "./placeSlice";

interface IState {
	comments: IFeedback[];
	isLoading: boolean;
	error: Error | null;
}

const initialState: IState = {
	comments: [],
	isLoading: false,
	error: null,
};

export const getFeedbacks = createAsyncThunk("feed/get", async () => {
	const response = await instance.get<IFeedback[]>("/feedback");
	return response.data;
});
export const postFeedback = createAsyncThunk(
	"feedback/post",
	async (payload: IFeedback) => {
		const response = await instance.post("/feedback", payload);
		return response.data;
	},
);

export const deleteFeedback = createAsyncThunk(
	"delete/track",
	async (id: number, thunkAPI) => {
		const { dispatch } = thunkAPI;
		const responce = await instance.delete(`/feedback/${id}`);
		dispatch(getPlace());
		return responce.data;
	},
);

const feedBackSlice = createSlice({
	name: "feedback",
	initialState,
	reducers: {},
	extraReducers: buidler => {
		buidler
			.addCase(getFeedbacks.pending, state => {
				state.isLoading = true;
			})
			.addCase(getFeedbacks.fulfilled, (state, action) => {
				state.isLoading = false;
				state.comments = action.payload;
			})
			.addCase(getFeedbacks.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as Error;
			});
	},
});

export default feedBackSlice;
