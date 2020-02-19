import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";
import App from "./App";
import fetchRates from "./fetchRates";

jest.mock("./fetchRates");

test("we can convert from euros", async () => {
  fetchRates.mockResolvedValueOnce({ RUB: 68.9685, USD: 1.0816 });
  render(<App />);

  // 1. Check that we see a loading message until the app is ready
  expect(screen.getByText("Loading...")).toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  // 2. Check that we see the initial conversion for 1 Euro to Dollars
  const input = screen.getByDisplayValue("1");
  expect(screen.getByText(/1.08/)).toBeInTheDocument();

  // 3. Change the amount and see that the conversion is updated
  fireEvent.change(input, { target: { value: "2" } });
  expect(screen.getByText(/2.16/)).toBeInTheDocument();

  // 4. Change the currency and see that the conversion is updated
  const select = screen.getByDisplayValue("USD");
  fireEvent.change(select, { target: { value: "RUB" } });
  expect(screen.getByText(/137.94/)).toBeInTheDocument();

  expect(fetchRates).toHaveBeenCalledWith();
  expect(fetchRates).toHaveBeenCalledTimes(1);
});
