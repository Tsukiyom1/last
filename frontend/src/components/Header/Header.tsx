// import React from "react";
// import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import DropDown from "../DropDown/DropDown";

const Header = () => {
	const navigate = useNavigate();
	const { userInfo } = useAppSelector(state => state.user);
	return (
		<header className='bg-slate-200 shadow-md'>
			<div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
				<h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
					<div className='text-slate-500'>
						<p>Cafe</p>
					</div>
					<div className='text-slate-700'>
						<p>Critic</p>
					</div>
				</h1>
				{userInfo?.username ? (
					<div className='flex gap-3 items-center'>
						<h2 className='text-black text-2xl font-bold'>
							Hello {userInfo?.displayName}
						</h2>
						<DropDown />
						<button
							onClick={() => navigate("/add")}
							className='bg-gray-700 text-amber-50 px-8 py-3 rounded-md hover:opacity-75'
						>
							Add New Place
						</button>
					</div>
				) : (
					<div className='flex gap-5 items-center'>
						<button
							onClick={() => navigate("/login")}
							className='bg-gray-700 text-amber-50 px-8 py-3 rounded-md hover:opacity-75'
						>
							Login
						</button>
						<button
							onClick={() => navigate("/register")}
							className='bg-gray-700 text-amber-50 px-8 py-3 rounded-md hover:opacity-75'
						>
							Register
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default Header;
