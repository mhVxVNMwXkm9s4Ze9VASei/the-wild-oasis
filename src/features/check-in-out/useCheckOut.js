import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
	const queryClient = useQueryClient();

	const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
		mutationFn: (booking_id) =>
			updateBooking(booking_id, {
				status: "checked-out",
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successully checked out!`);

			queryClient.invalidateQueries({ active: true });
		},
		onError: () =>
			toast.error("There was an error while attempting to check out."),
	});

	return { checkOut, isCheckingOut };
}
