import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/UserReservations";

test("it should show the correct text on the button if there is reservations", async () => {
  render(<UserReservations userId={1} />);

  const button = await screen.findByRole("button", {
    name: /purchase more tickets/i,
  });

  expect(button).toBeInTheDocument();
});

test("it should show the correct text on the button if there is no reservation", async () => {
  render(<UserReservations userId={0} />);

  const button = await screen.findByRole("button", {
    name: /purchase tickets/i,
  });
  expect(button).toBeInTheDocument();

  const heading = screen.queryByRole("heading", { name: /your tickets/i });
  expect(heading).not.toBeInTheDocument();
});
