import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinAPI,
		onError: (err) => toast.error(err.message),
		onSuccess: () => {
			toast.success("Cabin successfully deleted!");

			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},
	});

	return { deleteCabin, isDeleting };
}
