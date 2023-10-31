import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

function SignupForm() {
	const { isLoading, signup } = useSignup();
	const { register, formState, getValues, handleSubmit, reset } = useForm();
	const { errors } = formState;

	function onSubmit({ full_name, email, password }) {
		signup(
			{ full_name, email, password },
			{
				onSettled: () => reset(),
			}
		);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="Full name"
				error={errors?.full_name?.message}
			>
				<Input
					type="text"
					id="full_name"
					disabled={isLoading}
					{...register("full_name", { required: "This field is required." })}
				/>
			</FormRow>

			<FormRow
				label="Email address"
				error={errors?.email?.message}
			>
				<Input
					type="email"
					id="email"
					disabled={isLoading}
					{...register("email", {
						required: "This field is required.",
						pattern: {
							value: "/S+@S+.S+/",
							message: "Please enter a valid email address.",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					disabled={isLoading}
					{...register("password", {
						required: "This field is required.",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters long.",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isLoading}
					{...register("passwordConfirm", {
						required: "This field is required.",
						validate: (value) =>
							value === getValues().password || "The passwords do not match.",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					disabled={isLoading}
					type="reset"
				>
					Cancel
				</Button>
				<Button disabled={isLoading}>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;
