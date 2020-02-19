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

test("renders learn react link", async () => {
  fetchRates.mockResolvedValueOnce({ RUB: 68.9685, USD: 1.0816 });

  render(<App />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.getByText("Loading..."));

  const input = screen.getByDisplayValue("1");
  expect(screen.getByText(/1.08/)).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "2" } });
  expect(screen.getByText(/2.16/)).toBeInTheDocument();

  const select = screen.getByDisplayValue("USD");
  fireEvent.change(select, { target: { value: "RUB" } });
  expect(screen.getByText(/137.94/)).toBeInTheDocument();

  expect(fetchRates).toHaveBeenCalledWith();
  expect(fetchRates).toHaveBeenCalledTimes(1);
});
