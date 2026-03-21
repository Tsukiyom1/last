import { getPlace, postPlace } from "../../features/placeSlice";
import { useAppDispatch } from "../../store/hooks";
import PlaceSubmit from "./PlaceSubmit";

const NewPlace = () => {
	const dispatch = useAppDispatch();
	const onPlaceFormSubmit = async (artistData: FormData) => {
		await dispatch(postPlace(artistData)).then(() => {
			dispatch(getPlace());
		});
		// navigate("/");
	};
	return (
		<div>
			<h2 className='text-4xl text-gray-700 font-bold mb-2 py-4 text-center'>
				New Place Form
			</h2>
			<PlaceSubmit onSubmit={onPlaceFormSubmit} />
		</div>
	);
};

export default NewPlace;
