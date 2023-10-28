import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: deleteBookingAPI,
		onError: (err) => toast.error(err.message),
		onSuccess: () => {
			toast.success("Booking successfully deleted!");

			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},
	});

	return { deleteBooking, isDeleting };
}
