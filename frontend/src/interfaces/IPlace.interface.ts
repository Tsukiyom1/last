import type { IFeedback } from "./IFeedbac.interface";
import type { IImage } from "./IImage.interface";

export interface IPlace {
	id: number;
	name: string;
	description: string;
	main_image: string;
	userId: number;
	images: IImage[];
	feedbacks: IFeedback[];
	rating?: { food: number; service: number; interior: number; total: number };
}
