import type { IImage } from "./IImage.interface";

export interface IPlace {
	id: number;
	name: string;
	description: string;
	main_image: string;
	userId: number;
	images: IImage[];
	comments: unknown[];
	rating?: { food: number; service: number; interior: number; total: number };
}
