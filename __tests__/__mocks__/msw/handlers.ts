import { rest } from "msw";

import { readFakeData } from "../fakeData";
import { fakeUserReservations } from "../fakeData/userReservations";

export const handlers = [
  // index / showId = 0 has seats available in the fake data
  // index / showId = 1 has NO seats available in the fake data
  rest.get("http://localhost:3000/api/shows/:showId", async (req, res, ctx) => {
    const { fakeShows } = await readFakeData();
    const { showId } = req.params;

    return res(ctx.json({ show: fakeShows[Number(showId)] }));
  }),
  // index / userId = 0 has NO reservations
  // index / userId > 0 has reservations
  rest.get(
    "http://localhost:3000/api/users/:userId/reservations",
    async (req, res, ctx) => {
      const { userId } = req.params;
      if (Number(userId) === 0) return res(ctx.json({ userReservations: [] }));

      return res(ctx.json({ userReservations: fakeUserReservations }));
    }
  ),
];
