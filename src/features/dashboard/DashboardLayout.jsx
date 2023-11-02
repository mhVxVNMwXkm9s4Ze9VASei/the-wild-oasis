import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useCabins } from "../cabins/useCabins";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
	const { cabins, isLoading: isLoadingCabins } = useCabins();
	const {
		confirmedStays,
		isLoading: isLoadingStays,
		numDays,
		stays,
	} = useRecentStays();

	if (isLoadingBookings || isLoadingCabins || isLoadingStays)
		return <Spinner />;

	console.log(stays);

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				cabinCount={cabins.length}
				confirmedStays={confirmedStays}
				numDays={numDays}
			/>
			<div>Today&apos;s activity</div>
			<div>Chart stay durations</div>
			<div>Sales chart</div>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
