import { useMutation } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginAPI({ email, password }),
		onSuccess: () => {
			navigate("/dashboard");
		},
		onError: (err) => {
			console.log("Error:", err);
			toast.error("The provided e-mail and password combination is incorrect.");
		},
	});

	return { login, isLoading };
}
