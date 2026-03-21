import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import placeSlice from "../features/placeSlice";
import imageSlice from "../features/imageSlice";
import feedBackSlice from "../features/feedbackSlice";
export const rootReducer = combineReducers({
	user: userSlice.reducer,
	place: placeSlice.reducer,
	image: imageSlice.reducer,
	feedback: feedBackSlice.reducer,
});
