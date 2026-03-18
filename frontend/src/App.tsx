import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Places from "./container/Places/Places";
import Login from "./container/Auth/Login";
import Register from "./container/Auth/Register";
import NewPlace from "./container/Places/NewPlace";
import PlaceByid from "./container/Places/PlaceById";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route index element={<Places />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/add' element={<NewPlace />} />
						<Route path='/:placeId' element={<PlaceByid />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
