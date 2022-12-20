import { render, screen } from "@testing-library/react";

import { Reservation } from "@/components/reservations/Reservation";

test("it should show the correct number of available seats", async () => {
  render(<Reservation showId={0} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByText(/10 seats left/i);
  expect(seatCountText).toBeInTheDocument();
});

test("it should show 'sold out' message and no purchase button", async () => {
  render(<Reservation showId={1} submitPurchase={jest.fn()} />);

  const seatCountText = await screen.findByRole("heading", {
    name: /show is sold out!/i,
  });
  expect(seatCountText).toBeInTheDocument();

  const purchaseButton = screen.queryByRole("button", { name: "purchase" });
  expect(purchaseButton).not.toBeInTheDocument();
});
