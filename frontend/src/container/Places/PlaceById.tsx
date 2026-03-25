import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { getPlaceById } from "../../features/placeSlice.ts";
import { deleteImage, postImages } from "../../features/imageSlice.ts";
import moment from "moment";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { deleteFeedback, postFeedback } from "../../features/feedbackSlice.ts";
import { constants } from "../../constants/constance.ts";
import type { IFeedback } from "../../interfaces/IFeedbac.interface.ts";
import FileInput from "../../components/FileInput/FileInput.tsx";

interface ImageState {
	userId: string | undefined;
	placeId: string | undefined;
	image: File | string;
}

export interface FeedBackState {
	text: string;
	userId: string | undefined;
	placeId: string | undefined;
	food: number;
	service: number;
	interior: number;
}

const PlaceById = () => {
	const { placeId } = useParams();
	const userId = useAppSelector(state => state.user.userInfo?.id);
	const username = useAppSelector(state => state.user.userInfo?.displayName);

	const dispatch = useAppDispatch();
	const { places } = useAppSelector(state => state.place);
	const { userInfo } = useAppSelector(state => state.user);

	const [state, setState] = useState<ImageState>({
		image: "",
		userId: userId?.toString(),
		placeId: placeId,
	});

	const [feedback, setFeedback] = useState<FeedBackState>({
		text: "",
		food: 0,
		service: 0,
		interior: 0,
		userId: userId?.toString(),
		placeId: placeId,
	});
	useEffect(() => {
		dispatch(getPlaceById(Number(placeId)));
	}, []);

	const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!state.image) {
			alert("Please select an image file");
			return;
		}
		const formData = new FormData();

		Object.entries(state).forEach(([key, value]) => {
			if (value !== null && value !== undefined) {
				formData.append(key, value);
			}
		});
		console.log(state);
		console.log(formData);

		dispatch(postImages(formData)).then(() => {
			dispatch(getPlaceById(Number(placeId)));
		});
	};

	const submitCommentHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(
			postFeedback({
				text: feedback.text,
				food: feedback.food,
				service: feedback.service,
				interior: feedback.interior,
				userId: feedback.userId ?? "",
				placeId: feedback.placeId ?? "",
			}),
		).then(() => {
			dispatch(getPlaceById(Number(placeId)));
			setFeedback(prev => ({ ...prev, text: "" }));
		});
	};

	const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name } = e.target;
		const file = e.target.files ? e.target.files[0] : null;

		setState(prevState => ({
			...prevState,
			[name]: file,
		}));
	};

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState(prevState => {
			return { ...prevState, [name]: value };
		});
	};

	const commentChangeHandler = (
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		const { name, value } = event.target;
		if (name === "text") {
			if (value.length <= 500) {
				setFeedback({ ...feedback, [name]: value });
			}
		} else {
			const intValue = parseInt(value, 10);
			if (!isNaN(intValue) && intValue >= 0 && intValue <= 5) {
				setFeedback({ ...feedback, [name]: intValue });
			}
		}
	};

	const handleDelete = (id: number) => {
		dispatch(deleteFeedback(id)).then(() =>
			dispatch(getPlaceById(Number(placeId))),
		);
	};

	const handleDeleteImage = (id: number) => {
		dispatch(deleteImage(id)).then(() =>
			dispatch(getPlaceById(Number(placeId))),
		);
	};

	return (
		<>
			{places.map(place => (
				<div
					className='flex flex-wrap gap-80 justify-around items-center border-b pb-6 shadow-md'
					key={place.id}
				>
					<div className='-mt-20'>
						<h2 className='text-4xl font-bold mb-10 '>{place.name}</h2>
						<p className='text-1xl font-medium max-w-1xl'>
							{place.description}
						</p>
					</div>
					<img
						className='mt-5 w-64'
						src={`${constants}/uploads/${place.main_image}`}
						alt=''
					/>
				</div>
			))}

			<div className='bg-slate-50 h-screen '>
				<h2 className='text-4xl text-gray-700 font-bold mb-2 py-4 text-center'>
					Gallery
				</h2>
				{places?.map(place => {
					return (
						<div className='flex flex-row  gap-3 flex-wrap items-center border-b border-y-gray-400'>
							{place.images.length > 0 &&
								place.images &&
								place.images.map(image => (
									<div
										className='ml-14 mb-6 relative'
										key={image.id ?? image.image}
									>
										<img
											className='w-48 h-32 '
											src={`${constants}/uploads/${image.image}`}
											alt={image.image}
										/>
										{userInfo?.role === "admin" && (
											<button
												type='button'
												onClick={() => handleDeleteImage(image.id)}
												className='absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:opacity-80'
											>
												Delete
											</button>
										)}
									</div>
								))}
						</div>
					);
				})}

				<h2 className='text-4xl text-gray-700 font-bold mb-2 py-4 text-center '>
					FeedBacks
				</h2>
				{places?.map(place => {
					return (
						<div
							className='flex flex-row gap-3 flex-wrap items-center border-b border-y-gray-400 w-full'
							key={place.id}
						>
							{place.feedbacks.length > 0 &&
								place.feedbacks &&
								(place?.feedbacks as IFeedback[]).map(comment =>
									userInfo?.role === "admin" ? (
										<div
											key={comment.id}
											className='p-12 mb-8 border rounded-lg bg-white shadow'
										>
											<p>
												{username} On{" "}
												{comment.datetime
													? moment(comment.datetime).format("DD.MM.YYYY HH:mm")
													: ""}{" "}
												Said:
											</p>
											<div>{comment.text}</div>
											<p>interior : {comment.interior}</p>
											<p>service : {comment.service}</p>
											<p>food : {comment.food}</p>
											<button
												onClick={() => {
													handleDelete(comment.id as number);
												}}
												className=' bg-gray-700 mt-5 ml-2 text-amber-50 px-6 py-2 rounded-md hover:opacity-75 '
											>
												Delete
											</button>
										</div>
									) : (
										<div
											key={comment.id}
											className='p-12 mb-8 border rounded-lg bg-white shadow'
										>
											<p>
												{username} On{" "}
												{comment.datetime
													? moment(comment.datetime).format("DD.MM.YYYY HH:mm")
													: ""}{" "}
												Said:
											</p>
											<div>{comment.text}</div>
											<p>interior : {comment.interior}</p>
											<p>service : {comment.service}</p>
											<p>food : {comment.food}</p>
										</div>
									),
								)}
						</div>
					);
				})}

				{userInfo && (
					<form
						className='flex flex-wrap flex-row justify-start items-center ml-14 my-8 '
						onSubmit={submitFormHandler}
					>
						<input
							type='text'
							hidden
							name='placeId'
							onChange={inputChangeHandler}
							value={state.placeId}
						/>
						<input
							type='text'
							hidden
							name='userId'
							onChange={inputChangeHandler}
							value={state.userId}
						/>
						<div>
							<FileInput
								name='image'
								onChange={fileChangeHandler}
								label='Image'
							/>
							<button
								className='bg-gray-700 mt-5  text-amber-50 px-20 py-3 rounded-md hover:opacity-75'
								type='submit'
							>
								Send
							</button>
						</div>
					</form>
				)}

				{userInfo && (
					<form onSubmit={submitCommentHandler} className='p-12 mt-12'>
						<textarea
							value={feedback.text}
							onChange={commentChangeHandler}
							name='text'
							className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Leave a comment...'
						></textarea>
						<div className='flex flex-row justify-between items-center my-8 gap-3'>
							<input
								min='0'
								max='5'
								type='number'
								className='peer block min-h-[auto] w-full rounded border-0 bg-gray-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-45 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-45 motion-reduce:transition-none'
								placeholder='interior'
								value={feedback.interior}
								name={"interior"}
								onChange={commentChangeHandler}
							/>
							<input
								min='0'
								max='5'
								type='number'
								className='peer block min-h-[auto] w-full rounded border-0 bg-gray-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-45 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-45 motion-reduce:transition-none'
								placeholder='service'
								value={feedback.service}
								name={"service"}
								onChange={commentChangeHandler}
							/>
							<input
								min='0'
								max='5'
								type='number'
								className='peer block min-h-[auto] w-full rounded border-0 bg-gray-700 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-45 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-45 motion-reduce:transition-none'
								placeholder='food'
								value={feedback.food}
								name={"food"}
								onChange={commentChangeHandler}
							/>
							<input
								type='text'
								hidden
								name='placeId'
								onChange={commentChangeHandler}
								value={feedback.placeId}
							/>
							<input
								type='text'
								hidden
								name='userId'
								onChange={commentChangeHandler}
								value={feedback.userId}
							/>
						</div>
						<button
							className='bg-gray-700 mt-5  text-amber-50 px-20 py-3 rounded-md hover:opacity-75'
							type='submit'
						>
							Send
						</button>
					</form>
				)}
			</div>
		</>
	);
};

export default PlaceById;
