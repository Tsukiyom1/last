export interface IUser {
	id?: number;
	username: string;
	displayName: string | null;
	token: string;
	role: string;
}
