import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";

import { useCabins } from "../cabins/useCabins";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

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
  } = useRecentStays();

  if (isLoadingBookings || isLoadingCabins || isLoadingStays)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        cabinCount={cabins.length}
        confirmedStays={confirmedStays}
        numDays={numDays}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart
        bookings={bookings}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
