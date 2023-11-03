import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingID }) {
  const { checkOut, isCheckingOut } = useCheckOut(bookingID);
  return (
    <Button
      disabled={isCheckingOut}
      onClick={() => checkOut(bookingID)}
      size="small"
      variation="primary"
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
