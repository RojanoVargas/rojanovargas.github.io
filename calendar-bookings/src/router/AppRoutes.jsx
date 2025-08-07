import { Routes, Route } from "react-router-dom";
import Calendar from "../views/Calendar";
import BookingDetail from "../views/BookingDetail";

const AppRoutes = () => (
	<Routes>
		<Route path="/" element={<Calendar />} />
		<Route
			path="/stations/:stationId/bookings/:bookingId"
			element={<BookingDetail />}
		/>
	</Routes>
);

export default AppRoutes;
