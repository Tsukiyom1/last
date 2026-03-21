import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getPlaceById } from "../../features/placeSlice";
import { useParams } from "react-router-dom";

const PlaceByid = () => {
	const { placeId } = useParams();
	const dispatch = useAppDispatch();
	// const { places } = useAppSelector(state => state.place);

	// const navigate = useNavigate();

	useEffect(() => {
		dispatch(getPlaceById(Number(placeId)));
	}, []);

	console.log(placeId);

	return <div>PlaceByid</div>;
};

export default PlaceByid;
