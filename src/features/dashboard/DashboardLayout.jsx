import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

function DashboardLayout() {
	const { bookings, isLoadingBookings } = useRecentBookings();
	const { confirmedStays, isLoadingStays, stays } = useRecentStays();

	if (isLoadingBookings || isLoadingStays) return <Spinner />;

	console.log(bookings, confirmedStays, stays);

	return (
		<StyledDashboardLayout>
			<div>Statistics</div>
			<div>Today&apos;s activity</div>
			<div>Chart stay durations</div>
			<div>Sales chart</div>
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;
