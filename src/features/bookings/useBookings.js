import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();

	// Filter.
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };

	// Sort.
	const sortByRaw = searchParams.get("sortBy") || "start_date-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { direction, field };

	// Pagination.
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	const {
		isLoading,
		data: { count, data: bookings } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, page, sortBy],
		queryFn: () => getBookings({ filter, page, sortBy }),
	});

	return { bookings, count, error, isLoading };
}
