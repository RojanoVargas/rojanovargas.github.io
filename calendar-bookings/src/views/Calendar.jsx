import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCalendar } from "../hooks/useCalendar";
import Autocomplete from "../components/Autocomplete";
import "./Calendar.css";
import { FaCaravan } from "react-icons/fa6";

function Calendar() {
	const date = useCalendar();
	const [selectedStation, setSelectedStation] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [weekOffset, setWeekOffset] = useState(0);

	// Fetch bookings when a station is selected
	useEffect(() => {
		if (!selectedStation) return;

		const fetchBookings = async () => {
			try {
				const res = await fetch(
					`https://605c94c36d85de00170da8b4.mockapi.io/stations/${selectedStation.id}/bookings`
				);
				const data = await res.json();
				setBookings(data);
			} catch (error) {
				console.error("Error fetching bookings:", error);
				setBookings([]);
			}
		};

		fetchBookings();
	}, [selectedStation]);

	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const getWeekDates = () => {
		const today = date.today.add({ days: weekOffset * 7 });
		const currentDayOfWeek = today.dayOfWeek;
		const weekDates = [];

		for (let i = 0; i < 7; i++) {
			const daysFromMonday = i + 1 - currentDayOfWeek;
			const weekDay = today.add({ days: daysFromMonday });
			weekDates.push(weekDay);
		}

		return weekDates;
	};

	const weekDates = getWeekDates();

	return (
		<>
			<Autocomplete onSelectStation={setSelectedStation} />
			<div className="week-grid">
				{days.map((day, index) => {
					const dateForDay = weekDates[index];
					const formattedDate = `${dateForDay.year}-${String(
						dateForDay.month
					).padStart(2, "0")}-${String(dateForDay.day).padStart(2, "0")}`;

					const bookingsOnDay = bookings.filter(
						(booking) =>
							booking.startDate === formattedDate ||
							booking.endDate === formattedDate
					);

					return (
						<div key={day} className="day-group">
							<div className="day-label">
								{dateForDay.day} / {dateForDay.month} / {dateForDay.year} <br />
								{day}
							</div>
							<div className="day-square">
								{bookingsOnDay.length > 0 ? (
									<ul>
										{bookingsOnDay.map((b) => (
											<Link
												key={b.id}
												to={`/stations/${selectedStation.id}/bookings/${b.id}`}
												className="booking-link"
											>
												<li className="booking-card">
													🚐 Booking #{b.id}
													<br />
													{new Date(b.startDate).toLocaleDateString(
														"en-GB"
													)} → {new Date(b.endDate).toLocaleDateString("en-GB")}
												</li>
											</Link>
										))}
									</ul>
								) : (
									<div className="no-booking">No bookings</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
			<div className="week-controls">
				<button onClick={() => setWeekOffset((prev) => prev - 1)}>
					<span>←</span>
					<span className="button-text">Previous Week</span>
				</button>
				<button onClick={() => setWeekOffset(0)}>Today</button>
				<button onClick={() => setWeekOffset((prev) => prev + 1)}>
					<span className="button-text">Next Week</span>
					<span>→</span>
				</button>
			</div>
		</>
	);
}

export default Calendar;
