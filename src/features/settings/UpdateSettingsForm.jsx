import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: {
			min_booking_length,
			max_booking_length,
			max_guests_per_booking,
			breakfast_price,
		} = {},
	} = useSettings();
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isLoading) return <Spinner />;

	function handleBlur(e, field) {
		const { value } = e.target;

		if (!value) return;
		updateSetting({ [field]: value });
	}

	// This time we are using UNCONTROLLED fields, so we will NOT store state
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					defaultValue={min_booking_length}
					onBlur={(e) => handleBlur(e, "min_booking_length")}
					disabled={isUpdating}
					id="min-nights"
				/>
			</FormRow>

			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					defaultValue={max_booking_length}
					onBlur={(e) => handleBlur(e, "max_booking_length")}
					disabled={isUpdating}
					id="max-nights"
				/>
			</FormRow>

			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					defaultValue={max_guests_per_booking}
					onBlur={(e) => handleBlur(e, "max_guests_per_booking")}
					disabled={isUpdating}
					id="max-guests"
				/>
			</FormRow>

			<FormRow label="Breakfast price">
				<Input
					type="number"
					defaultValue={breakfast_price}
					onBlur={(e) => handleBlur(e, "breakfast_price")}
					disabled={isUpdating}
					id="breakfast-price"
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
