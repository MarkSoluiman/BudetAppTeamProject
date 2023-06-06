import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeGoalsModal from "./HomeGoalsModal";

// Mock dependencies
// jest.mock("../../firebase.config", () => ({
//   firebase: {
//     firestore: jest.fn(),
//   },
// }));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  onSnapshot: jest.fn(),
  orderBy: jest.fn(),
}));
jest.mock("expo-status-bar", () => ({
  StatusBar: jest.fn(),
}));
jest.mock("react-native-gesture-handler", () => ({
  FlatList: jest.fn(),
}));

describe("HomeGoalsModal", () => {
  test("renders the component and navigates back on button press", () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const { getByText } = render(
      <HomeGoalsModal navigation={navigationMock} />
    );

    // Assert that the component renders correctly
    expect(getByText("Goal Bar Progress")).toBeTruthy();

    // Simulate button press
    fireEvent.press(getByText("GO BACK"));

    // Assert that the navigation function was called
    expect(navigationMock.navigate).toHaveBeenCalledWith("Home");
  });
});
