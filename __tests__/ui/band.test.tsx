import { render, screen } from "@testing-library/react";

import BandPage from "@/pages/bands/[bandId]";

import { readFakeData } from "../__mocks__/fakeData";

test("it should have correct band information", async () => {
  const { fakeBands } = await readFakeData();

  render(<BandPage band={fakeBands[0]} error={null} />);

  const heading = screen.getByRole("heading", {
    name: /the wandering bunnies/i,
  });
  expect(heading).toBeInTheDocument();
});

test("it should have error message", () => {
  render(<BandPage band={null} error="Lorem ipsum dolor sit amet" />);

  const heading = screen.getByRole("heading", {
    name: /lorem ipsum dolor sit amet/i,
  });
  expect(heading).toBeInTheDocument();
});
