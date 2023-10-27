import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const [addBreakfast, setAddBreakfast] = useState(false);
	const [confirmPaid, setConfirmPaid] = useState(false);

	const { booking, isLoadingBooking } = useBooking();
	const { settings, isLoading: isLoadingSettings } = useSettings();

	useEffect(() => setConfirmPaid(booking?.is_paid ?? false), [booking]);

	const moveBack = useMoveBack();
	const { checkIn, isCheckingIn } = useCheckIn();

	if (isLoadingBooking || isLoadingSettings) return <Spinner />;

	const {
		id: booking_id,
		guests,
		total_price,
		num_guests,
		has_breakfast,
		num_nights,
	} = booking;

	const optionalBreakfastPrice =
		settings.breakfast_price * num_nights * num_guests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkIn({
				booking_id,
				breakfast: {
					extras_price: optionalBreakfastPrice,
					has_breakfast: true,
					total_price: total_price + optionalBreakfastPrice,
				},
			});
		} else {
			checkIn({ booking_id, breakfast: {} });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{booking_id}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!has_breakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						id="breakfast"
						onChange={() => {
							setAddBreakfast(!addBreakfast);
							setConfirmPaid(false);
						}}
					>
						Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					disabled={confirmPaid || isCheckingIn}
					id="confirm"
					onChange={() => setConfirmPaid((confirm) => !confirm)}
				>
					I confirm that {guests.full_name} has paid the total amount due of{" "}
					{!addBreakfast
						? formatCurrency(total_price)
						: `${formatCurrency(total_price + optionalBreakfastPrice)}
              (${formatCurrency(total_price)} +
              ${formatCurrency(optionalBreakfastPrice)})`}
					.
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					disabled={!confirmPaid || isCheckingIn}
					onClick={handleCheckin}
				>
					Check in booking #{booking_id}
				</Button>
				<Button
					variation="secondary"
					onClick={moveBack}
				>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
