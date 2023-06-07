import React, { useEffect } from 'react';
import { collection, getAuth, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { mocked } from 'ts-jest/utils';
import { render, act } from '@testing-library/react';

jest.mock('firebase/firestore');

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

  test('fetches goals list on mount', async () => {
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

    // Create a test component that uses the useEffect hook
    const TestComponent = () => {
      useEffect(() => {
        const todoRef = query(
          collection(firebase.firestore(), "Goals"),
          where("uid", "==", getAuth().currentUser.uid),
          where("goal_complete", "==", false),
          orderBy("goal_date", "asc")
        );
        const unsubscribe = onSnapshot(todoRef, (querySnapshot) => {
          const goalsList = [];
          querySnapshot.forEach((doc) => {
            const { goal_date, goal_name, goal_balance, goal_amount } = doc.data();
            goalsList.push({
              goal_date: goal_date.toDate(),
              goal_name,
              goal_balance,
              goal_amount,
            });
          });
          setGoalsList(goalsList);
        });
        return () => unsubscribe();
      }, []);

      return null;
    };

    // Render the test component
    render(<TestComponent />);

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
});
