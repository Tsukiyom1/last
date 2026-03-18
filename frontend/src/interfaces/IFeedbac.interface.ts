export interface IFeedback {
	id?: number | undefined;
	datetime?: string;
	text: string;
	userId: string | undefined;
	placeId: string | undefined;
	food: number;
	service: number;
	interior: number;
}
