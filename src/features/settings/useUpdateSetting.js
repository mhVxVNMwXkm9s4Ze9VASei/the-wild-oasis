import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingAPI } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: updateSettingAPI,
		onError: (error) => toast.error(error.message),
		onSuccess: () => {
			toast.success("Setting successfully updated!");
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
	});

	return { isUpdating, updateSetting };
}
