import { renderHook } from '@testing-library/react-native';
import { useEffect } from 'react';
import { collection, getAuth, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { mocked } from 'ts-jest/utils';
import HomeGoalsModal from "./HomeGoalsModal";

jest.mock('firebase/firestore');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('useGoalsList', () => {
  const mockedGetAuth = mocked(getAuth, true);
  const mockedCollection = mocked(collection, true);
  const mockedQuery = mocked(query, true);
  const mockedWhere = mocked(where, true);
  const mockedOrderBy = mocked(orderBy, true);
  const mockedOnSnapshot = mocked(onSnapshot, true);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches goals list on mount', () => {
    const dummyUid = 'dummyUid';
    const dummyGoalsList = [
      {
        goal_date: new Date(),
        goal_name: 'Goal 1',
        goal_balance: 100,
        goal_amount: 500,
      },
      // ... add more dummy goals
    ];

    // Mock the return values for Firebase Firestore functions
    mockedGetAuth.mockReturnValue({ currentUser: { uid: dummyUid } });
    mockedCollection.mockReturnValue(dummyGoalsList);
    mockedQuery.mockReturnValue(dummyGoalsList);
    mockedWhere.mockReturnValue(dummyGoalsList);
    mockedOrderBy.mockReturnValue(dummyGoalsList);

    // Render the hook
    renderHook(() => useGoalsList());

    // Assert that the Firebase Firestore functions were called correctly
    expect(mockedCollection).toHaveBeenCalledWith(expect.anything(), 'Goals');
    expect(mockedWhere).toHaveBeenCalledWith(expect.anything(), 'uid', '==', dummyUid);
    expect(mockedWhere).toHaveBeenCalledWith(expect.anything(), 'goal_complete', '==', false);
    expect(mockedOrderBy).toHaveBeenCalledWith(expect.anything(), 'goal_date', 'asc');
    expect(mockedOnSnapshot).toHaveBeenCalledWith(
      dummyGoalsList,
      expect.any(Function)
    );
  });

  test('updates goals list on snapshot', () => {
    // Define initial and updated goals list
    const initialGoalsList = [];
    const updatedGoalsList = [
      {
        goal_date: new Date(),
        goal_name: 'Goal 1',
        goal_balance: 100,
        goal_amount: 500,
      },
      // ... add more updated goals
    ];

    // Mock the onSnapshot callback function
    const onSnapshotCallback = jest.fn((callback) => {
      // Invoke the callback with updated goals list
      callback({ forEach: (cb) => updatedGoalsList.forEach(cb) });
    });
    mockedOnSnapshot.mockImplementation(onSnapshotCallback);

    // Render the hook
    const { result } = renderHook(() => useGoalsList());

    // Assert that the initial goals list is empty
    expect(result.current.goalsList).toEqual(initialGoalsList);

    // Call the onSnapshot callback to simulate snapshot update
    onSnapshotCallback.mock.calls[0][1]();

    // Assert that the goals list is updated
    expect(result.current.goalsList).toEqual(updatedGoalsList);
  });
});
