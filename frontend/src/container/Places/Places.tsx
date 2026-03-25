import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deletePlace, getPlace } from "../../features/placeSlice";
import { constants } from "../../constants/constance";
import { useNavigate } from "react-router-dom";

const Places = () => {
	const dispatch = useAppDispatch();
	const { places } = useAppSelector(state => state.place);
	const { userInfo } = useAppSelector(state => state.user);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getPlace());
	}, []);

	console.log(places);
	console.log(userInfo);

	const handleDelete = (id: number) => {
		dispatch(deletePlace(id));
	};

	return (
		<div className='bg-slate-50 h-screen   w-full'>
			<div className='border-b border-y-gray-400 mb-4'>
				<h2 className='text-4xl text-gray-700 font-bold mb-2 py-4 text-center'>
					All Places
				</h2>
			</div>
			<div className='flex flex-row  gap-20 flex-wrap items-center justify-center'>
				{places.map(place =>
					userInfo?.role === "admin" ? (
						<div
							className='max-w-sm bg-blend-normal border border-gray-200  rounded-lg shadow '
							key={place.id}
						>
							<img
								className='rounded-t-lg w-56 h-48'
								src={`${constants}/uploads/${place.main_image}`}
								alt={place.name}
							/>
							<div className='p-5'>
								<h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-dark'>
									{place.name}
								</h2>
								<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
									Photos: {place.images.length}
								</p>
								<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
									Rating: {place.rating?.total ?? "—"}
								</p>
								<button
									className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									onClick={() => navigate(`/${place.id}`)}
								>
									View{" "}
									<svg
										className='w-3.5 h-3.5 ml-2'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 14 10'
									>
										<path
											stroke='currentColor'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M1 5h12m0 0L9 1m4 4L9 9'
										/>
									</svg>
								</button>
								<button
									onClick={() => {
										handleDelete(place.id);
									}}
									className=' bg-gray-700 mt-5 ml-2 text-amber-50 px-6 py-2 rounded-md hover:opacity-75 '
								>
									Delete
								</button>
							</div>
						</div>
					) : (
						<div
							className='max-w-sm bg-blend-normal border border-gray-200  rounded-lg shadow '
							key={place.id}
						>
							<img
								className='rounded-t-lg w-56 h-48'
								src={`${constants}/uploads/${place.main_image}`}
								alt={place.name}
							/>
							<div className='p-5'>
								<h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-dark'>
									{place.name}
								</h2>
								<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
									Photos: {place.images.length}
								</p>
								<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
									Rating: {place.rating?.total ?? "—"}
								</p>
								<button
									className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									onClick={() => navigate(`/${place.id}`)}
								>
									View{" "}
									<svg
										className='w-3.5 h-3.5 ml-2'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 14 10'
									>
										<path
											stroke='currentColor'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M1 5h12m0 0L9 1m4 4L9 9'
										/>
									</svg>
								</button>
							</div>
						</div>
					),
				)}
			</div>
		</div>
	);
};

export default Places;
