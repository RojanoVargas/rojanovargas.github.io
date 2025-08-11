import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Temporal } from "@js-temporal/polyfill";
import "./BookingDetail.css";
import { AppContext } from "../context/AppContext";

const BookingDetail = () => {
	const { stationId, bookingId } = useParams();
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const contextMessage = useContext(AppContext);

	useEffect(() => {
		console.log(contextMessage);
	}, [contextMessage]);

	useEffect(() => {
		const fetchBooking = async () => {
			try {
				const res = await fetch(
					`https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}/bookings/${bookingId}`
				);
				if (!res.ok) throw new Error("Booking not found");
				const data = await res.json();
				setBooking(data);
			} catch (err) {
				setError(`Failed to fetch booking: ${err.message}`);
			} finally {
				setLoading(false);
			}
		};

		fetchBooking();
	}, [stationId, bookingId]);

	if (loading)
		return (
			<div className="loading-container">
				<img
					src="/loading-car.png"
					alt="Loading..."
					className="loading-image"
				/>
				<p>Loading booking...</p>
			</div>
		);
	if (error) return <p>{error}</p>;

	const calculateDuration = (start, end) => {
		const startDate = Temporal.PlainDate.from(start);
		const endDate = Temporal.PlainDate.from(end);
		const duration = endDate.since(startDate, { largestUnit: "days" });
		return duration.days;
	};

	return (
		<>
			<div className="banner-container">
				<img
					src="/welcome-banner.jpg"
					alt="Welcome banner"
					className="welcome-banner"
				/>
			</div>
			<div className="booking-text">
				<img src="/loading-car.png" className="van-image" alt="loading van" />
				<h2>Booking for {booking.customerName}</h2>
				<p>
					<strong>Start Date:</strong>{" "}
					{new Date(booking.startDate).toLocaleString()}
				</p>
				<p>
					<strong>End Date:</strong>{" "}
					{new Date(booking.endDate).toLocaleString()}
				</p>
				<p>
					Duration: {calculateDuration(booking.startDate, booking.endDate)} days
				</p>
				<p>
					Pickup in {booking.pickupStation} and return in{" "}
					{booking.returnStation}
				</p>
			</div>

			<Link className="btn-return" to="/">
				Return to the calendar
			</Link>
		</>
	);
};

export default BookingDetail;
