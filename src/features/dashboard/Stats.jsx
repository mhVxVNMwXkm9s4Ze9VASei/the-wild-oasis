import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, cabinCount, confirmedStays, numDays }) {
	const checkins = confirmedStays.length;
	const numBookings = bookings.length;
	const occupancy =
		confirmedStays.reduce((acc, booking) => acc + booking.num_nights, 0) /
		(numDays * cabinCount);
	const sales = bookings.reduce((acc, booking) => acc + booking.total_price, 0);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupancy * 100) + "%"}
			/>
		</>
	);
}

export default Stats;
