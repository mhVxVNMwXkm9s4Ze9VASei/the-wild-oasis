import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { RESULTS_PER_PAGE } from "../../utils/constants";

export function useBookings() {
	const queryClient = useQueryClient();
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

	// Query.
	const {
		isLoading,
		data: { count, data: bookings } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, page, sortBy],
		queryFn: () => getBookings({ filter, page, sortBy }),
	});

	// Prefetching.
	const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

	if (page < pageCount)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, page + 1, sortBy],
			queryFn: () => getBookings({ filter, page: page + 1, sortBy }),
		});

	if (page > 1)
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, page - 1, sortBy],
			queryFn: () => getBookings({ filter, page: page - 1, sortBy }),
		});

	return { bookings, count, error, isLoading };
}
