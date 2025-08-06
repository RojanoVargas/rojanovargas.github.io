import { useCalendar } from "../hooks/useCalendar";
import "./Calendar.css";

function Calendar() {
	const date = useCalendar();
	console.log(date.currentDayOfTheWeek);

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
		const today = date.today;
		const currentDayOfWeek = date.currentDayOfTheWeek;
		const weekDates = [];

		for (let i = 0; i < 7; i++) {
			const daysFromMonday = i + 1 - currentDayOfWeek;
			const weekDay = today.add({ days: daysFromMonday });
			weekDates.push(weekDay.day);
		}

		return weekDates;
	};

	const weekDates = getWeekDates();

	return (
		<div className="week-grid">
			{days.map((day, index) => (
				<div key={day} className="day-group">
					<div className="day-label">
						{weekDates[index]}<br />{day}
					</div>
					<div className="day-square">dynamic data</div>
				</div>
			))}
		</div>
	);
}

export default Calendar;
