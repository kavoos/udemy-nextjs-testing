import { generateNewReservation } from "@/__tests__/__mocks__/fakeData/newReservation";
import { generateRandomId } from "@/lib/features/reservations/utils";

const ONE_SECOND = 1000;
const FIFTEEN_SECOND = 15 * ONE_SECOND;
const THIRTY_SECOND = 30 * ONE_SECOND;

it("should refresh the shows page after 30 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/shows");

  // there should be only one sold-out show
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // buy all tickets for first show (id 0, 10 seats available)
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 10,
  });
  cy.task("addReservation", newReservation);

  // advance time (less than 30 seconds revalidation interval) and check again
  cy.tick(ONE_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 1);

  // advance time 30 seconds and check again
  cy.tick(THIRTY_SECOND);
  cy.findAllByText(/sold out/i).should("have.length", 2);
});

it("should refresh the reservation page after 15 seconds", () => {
  cy.clock();
  cy.task("db:reset").visit("/reservations/0");

  // click "sign-in" button (from main page, not nav) to sign in
  // (in an app where user/password weren't pre-filled,
  // would also need to get from env vars and fill)
  cy.findByRole("main").within(() =>
    cy.findByRole("button", { name: /sign in/i }).click()
  );

  // it should show 10 seats left
  cy.findAllByText(/10 seats left/i).should("exist");

  // the first show (id 0, 10 seats available)
  const newReservation = generateNewReservation({
    reservationId: generateRandomId(),
    showId: 0,
    seatCount: 2,
  });
  cy.task("addReservation", newReservation);

  // advance time (less than 15 seconds revalidation interval) and check again
  cy.tick(ONE_SECOND);
  cy.findAllByText(/10 seats left/i).should("exist");

  // advance time 15 seconds and check again
  cy.tick(FIFTEEN_SECOND);
  cy.findAllByText(/8 seats left/i).should("exist");
});
