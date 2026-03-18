import { useNavigate } from "react-router-dom";
import register from "../../../public/register.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerUser } from "../../features/userSlice";

interface RegisterState {
	username: string;
	displayName: string;
	password: string;
}

const Register = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { registerError, loading } = useAppSelector(state => state.user);
	const [state, setState] = useState<RegisterState>({
		username: "",
		displayName: "",
		password: "",
	});

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState(prev => ({ ...prev, [name]: value }));
	};

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			registerUser({
				username: state.username,
				displayName: state.displayName || undefined,
				password: state.password,
			}),
		)
			.unwrap()
			.then(() => {
				navigate("/");
			})
			.catch(() => {});
	};

	const errorMessage =
		typeof registerError === "string"
			? registerError
			: Array.isArray(registerError)
				? registerError
						.map((e: { messages?: string[] }) => e.messages?.join(", "))
						.filter(Boolean)
						.join("; ")
				: null;
	return (
		<div className='flex justify-around items-center flex-wrap max-w-6xl mx-auto p-3 mt-12'>
			<img className='w-7/12' src={register} alt='register' />
			<div>
				<h2 className='text-3xl font-bold text-blue-600'>Create an account</h2>
				<form onSubmit={submitFormHandler}>
					{errorMessage && (
						<p className='text-red-600 text-sm my-2'>{errorMessage}</p>
					)}
					<div className='border-b border-y-gray-400 '>
						<p className='text-1xl font-bold text-black my-2'>Username</p>
						<input
							name='username'
							value={state.username}
							onChange={inputChangeHandler}
							type='text'
							className='border-2 border-blue-700 w-5/6 p-3 rounded-3xl mb-2'
							required
						/>
					</div>
					<div className='border-b border-y-gray-400 '>
						<p className='text-1xl font-bold text-black my-2'>
							Display name (optional)
						</p>
						<input
							name='displayName'
							value={state.displayName}
							onChange={inputChangeHandler}
							type='text'
							className='border-2 border-blue-700 w-5/6 p-3 rounded-3xl mb-2'
						/>
					</div>
					<div className='border-b border-y-gray-400 '>
						<p className='text-1xl font-bold text-black my-2'>Password</p>
						<input
							name='password'
							value={state.password}
							onChange={inputChangeHandler}
							type='password'
							className='border-2 border-blue-700 w-5/6 p-3 rounded-3xl mb-2'
							required
						/>
					</div>
					<div className='flex justify-center flex-wrap -ml-10 mb-2'>
						<button
							type='submit'
							disabled={loading}
							className='bg-blue-600 py-2 px-10 mt-3 rounded-lg text-amber-50 hover:opacity-75 disabled:opacity-50'
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
