import axios from "axios";
import { constants } from "../constants/constance";

export const instance = axios.create({
	baseURL: constants,
});
