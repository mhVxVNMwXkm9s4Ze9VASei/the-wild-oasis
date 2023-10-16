import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editID, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editID);

	const { formState, getValues, handleSubmit, register, reset } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});
	const { errors } = formState;
	const queryClient = useQueryClient();
	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createEditCabin,
		onError: (err) => toast.error(err.message),
		onSuccess: () => {
			toast.success("New cabin successfully created!");

			queryClient.invalidateQueries({ queryKey: ["cabins"] });

			reset();
		},
	});

	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onError: (err) => toast.error(err.message),
		onSuccess: () => {
			toast.success("Cabin successfully edited!");

			queryClient.invalidateQueries({ queryKey: ["cabins"] });

			reset();
		},
	});

	const isWorking = isCreating || isEditing;

	function onError(errors) {
		console.log(errors);
	}

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin({ newCabinData: { ...data, image: image }, id: editID });
		else createCabin({ ...data, image: image });
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow
				error={errors?.name?.message}
				label="Cabin name"
			>
				<Input
					disabled={isWorking}
					type="text"
					id="name"
					{...register("name", {
						required: "This field is required.",
					})}
				/>
			</FormRow>

			<FormRow
				error={errors?.max_capacity?.message}
				label="Maximum capacity"
			>
				<Input
					disabled={isWorking}
					type="number"
					id="max_capacity"
					{...register("max_capacity", {
						min: {
							value: 1,
							message: "Capacity should be at least 1.",
						},
						required: "This field is required.",
					})}
				/>
			</FormRow>

			<FormRow
				error={errors?.regular_price?.message}
				label="Regular price"
			>
				<Input
					disabled={isWorking}
					type="number"
					id="regular_price"
					{...register("regular_price", {
						min: {
							value: 1,
							message: "The price should be at least 1.",
						},
						required: "This field is required.",
					})}
				/>
			</FormRow>

			<FormRow
				error={errors?.discount?.message}
				label="Discount"
			>
				<Input
					disabled={isWorking}
					type="number"
					id="discount"
					defaultValue={0}
					{...register("discount", {
						required: "This field is required.",
						validate: (value) =>
							value <= getValues().regular_price ||
							"The discount should not be more than the regular price.",
					})}
				/>
			</FormRow>

			<FormRow
				error={errors?.description?.message}
				label="Description for website"
			>
				<Textarea
					disabled={isWorking}
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "This field is required.",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo">
				<FileInput
					disabled={isWorking}
					id="image"
					accept="image/*"
					type="file"
					{...register("image", {
						required: isEditSession ? false : "This field is required.",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit" : "Create new"} cabin
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
