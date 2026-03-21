import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAppSelector } from "../../store/hooks";
import FileInput from "../../components/FileInput/FileInput";

interface Props {
	onSubmit: (data: FormData) => void;
}

interface State {
	name: string;
	description: string;
	main_image: string;
	userId: string | undefined;
	checked: boolean;
}
const PlaceSubmit = ({ onSubmit }: Props) => {
	const userId = useAppSelector(state => state.user.userInfo?.id);
	const [state, setState] = useState<State>({
		name: "",
		description: "",
		main_image: "",
		userId: userId?.toString(),
		checked: false,
	});
	console.log(
		userId,
		"id пользователя из редакса который мы получили с помощью хука useappslecetor",
	);

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		const newValue = type === "checkbox" ? checked : value;
		setState(prevState => ({ ...prevState, [name]: newValue }));
	};

	const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		const file = e.target.files ? e.target.files[0] : "";
		setState(prevState => ({ ...prevState, [name]: file }));
	};

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData();
		Object.entries(state).forEach(([key, value]) => {
			formData.append(key, value);
		});

		// onSubmit(formData);
	};
	return (
		<form onSubmit={submitFormHandler}>
			<div className='mb-6'>
				<input
					type='text'
					name='name'
					onChange={inputChangeHandler}
					value={state.name}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='place name'
					required
				/>
			</div>
			<div className='mb-6'>
				<input
					type='text'
					id='description'
					name='description'
					onChange={inputChangeHandler}
					value={state.description}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					placeholder='place description'
					required
				/>
			</div>
			<div className='mb-6 hidden'>
				<input
					type='text'
					name='userId'
					onChange={inputChangeHandler}
					value={state.userId}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					required
				/>
			</div>

			<div className='flex h-5 mb-6 flex-col'>
				<div className='mb-2'>
					<button type='button'>Privacy Policy</button>
				</div>
				<div className='flex flex-row items-center'>
					<input
						id='remember'
						type='checkbox'
						name='checked'
						checked={state.checked}
						onChange={inputChangeHandler}
						className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
						required
					/>
					<p className='ml-2'>I understand</p>
				</div>
				<div className='mt-8'>
					<FileInput
						name='main_image'
						onChange={fileChangeHandler}
						label='Image'
					/>
				</div>
				<div className='flex justify-center items-center'>
					<button
						type='submit'
						className='bg-gray-700 mt-5 text-amber-50 px-20 py-3 rounded-md hover:opacity-75'
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};

export default PlaceSubmit;
