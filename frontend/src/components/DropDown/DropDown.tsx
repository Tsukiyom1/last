import { useState } from "react";
import { IoMdArrowDown } from "react-icons/io";
import { logoutUser } from "../../features/userSlice.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const logoutHandler = () => {
		dispatch(logoutUser());
		navigate("/login");
	};
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	return (
		<div className='relative inline-block text-left'>
			<button
				onClick={toggleDropdown}
				className='inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50'
			>
				{isDropdownOpen ? "Close" : <IoMdArrowDown />}
			</button>
			{isDropdownOpen && (
				<div className='origin-top-right absolute right-0 mt-2 w-35 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
					<div
						className='py-1'
						role='menu'
						aria-orientation='vertical'
						aria-labelledby='options-menu'
					>
						<button
							onClick={() => {
								logoutHandler();
							}}
							className='block px-2 py-1 text-sm text-black hover:bg-gray-100'
							role='menuitem'
						>
							Logout
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
