import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ResetPass from "./ResetPass";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    sendPasswordResetEmail: jest.fn().mockResolvedValue(),
  })),
}));

describe("ResetPass", () => {
  it("shows success alert when a known email is input", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(<ResetPass />);
    const emailInput = getByPlaceholderText("Email");
    const resetButton = getByText("RESET");

    fireEvent.changeText(emailInput, "jasmine_amohia@hotmail.com");
    fireEvent.press(resetButton);

    // Wait for the success alert to appear
    const successAlert = await findByText("Password reset email sent successfully!");

    expect(successAlert).toBeDefined();
  });
});
