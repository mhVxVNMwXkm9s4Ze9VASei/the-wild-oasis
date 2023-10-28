import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
// 	display: grid;
// 	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
// 	column-gap: 2.4rem;
// 	align-items: center;
// 	padding: 1.4rem 2.4rem;

// 	&:not(:last-child) {
// 		border-bottom: 1px solid var(--color-grey-100);
// 	}
// `;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
	const {
		description,
		discount,
		id: cabinID,
		image,
		max_capacity,
		name,
		regular_price,
	} = cabin;

	const { createCabin } = useCreateCabin();
	const { deleteCabin, isDeleting } = useDeleteCabin();

	function handleDuplicate() {
		createCabin({
			description,
			discount,
			image,
			name: `Copy of ${name}`,
			max_capacity,
			regular_price,
		});
	}

	return (
		<Table.Row>
			<Img src={image} />
			<Cabin>{name}</Cabin>
			<div>Fits up to {max_capacity} guests.</div>
			<Price>{formatCurrency(regular_price)}</Price>
			{discount ? (
				<Discount>{formatCurrency(discount)}</Discount>
			) : (
				<span>&mdash;</span>
			)}
			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabinID} />
						<Menus.List id={cabinID}>
							<Menus.Button
								icon={<HiSquare2Stack />}
								onClick={handleDuplicate}
							>
								Duplicate
							</Menus.Button>
							<Modal.Open opens="edit">
								<Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
							</Modal.Open>
							<Modal.Open opens="delete">
								<Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="edit">
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						<Modal.Window name="delete">
							<ConfirmDelete
								disabled={isDeleting}
								onConfirm={() => deleteCabin(cabinID)}
								resourceName="cabins"
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
}

export default CabinRow;
