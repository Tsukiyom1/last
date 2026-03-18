import { useNavigate } from "react-router-dom";
import login from "../../../public/login.jpeg";
import { useAppDispatch } from "../../store/hooks";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { loginUser } from "../../features/userSlice";

interface LoginState {
	username: string;
	password: string;
}

const Login = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const [state, setState] = useState<LoginState>({
		username: "",
		password: "",
	});

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState(prevState => ({ ...prevState, [name]: value }));
	};

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser({ ...state }))
			.unwrap()
			.then(() => navigate("/"));
	};
	return (
		<div className='flex justify-around items-center flex-wrap max-w-6xl mx-auto p-3 mt-12'>
			<img className='w-7/12' src={login} alt='login' />
			<div>
				<h2 className='text-3xl font-bold text-blue-600'>Login</h2>
				<p className='text-2xl font-bold text-black my-2'>Hello Friends!</p>
				<p className='font-medium text-xs text-gray-400'>
					Enter your personal details and start the journey with us
				</p>
				<form onSubmit={submitFormHandler}>
					<div className='border-b border-y-gray-400'>
						<p className='text-1xl font-bold text-black my-2'>Email</p>
						<input
							value={state.username}
							onChange={inputChangeHandler}
							name='username'
							className='border-2 border-blue-600 w-5/6 p-3 rounded-3xl mb-2'
							type='text'
						/>
					</div>
					<div>
						<p className='text-1xl font-bold text-black my-2'>Password</p>
						<input
							value={state.password}
							onChange={inputChangeHandler}
							name='password'
							type='password'
							className='border-2 border-blue-600 w-5/6 p-3 rounded-3xl mb-2'
						/>
					</div>
					<div className='flex justify-center flex-wrap -ml-10 mb-2'>
						<button
							type='submit'
							className='bg-blue-600 py-2 px-10 mt-3 rounded-lg text-amber-50 hover:opacity-75 '
						>
							Login
						</button>
					</div>
					<div className='text-center -ml-5'>
						<p className=' text-slate-400 '>Not a member? Create an account</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
