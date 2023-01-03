import { defineConfig } from "cypress";

import { resetDB } from "./__tests__/__mocks__/db/utils/reset-db";
import { addBand } from "./lib/features/bands/queries";
import { addReservation } from "./lib/features/reservations/queries";

export default defineConfig({
  env: {
    // to access within a test function:
    // Cypress.env("REVALIDATION_SECRET")
    REVALIDATION_SECRET: process.env.REVALIDATION_SECRET,
  },
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        "db:reset": () => resetDB().then(() => null),
        addBand: (newBand) => addBand(newBand).then(() => null),
        addReservation: (newReservation) =>
          addReservation(newReservation).then(() => null),
      });
    },
  },
});
