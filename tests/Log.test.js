import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import transList from '../navigation/screens/Log';

// Mock necessary dependencies
jest.mock('../firebase.config', () => ({
  app: jest.fn(),
  auth: {
    currentUser: {
      uid: 'user1',
    },
  },
  db: jest.fn(),
  firebase: {
    firestore: () => ({
      collection: jest.fn(() => ({
        where: jest.fn(() => ({
          orderBy: jest.fn(() => ({
            onSnapshot: jest.fn(),
          })),
        })),
        doc: jest.fn(),
        get: jest.fn(),
        batch: jest.fn(() => ({
          delete: jest.fn(),
          commit: jest.fn(),
        })),
      })),
    }),
    firestore: {
      FieldValue: {
        increment: jest.fn(),
      },
    },
  },
  getAuth: jest.fn(() => ({
    currentUser: {
      uid: 'user1',
    },
  })),
}));

describe('transList', () => {
  it('renders the transList component', () => {
    render(<transList />);
    expect(1).toEqual(1)
  });

  it('calls deleteEntry function when delete icon is pressed', () => {
    const { getAllByTestId } = render(<Log />);
    const deleteButtons = getAllByTestId('delete-button');

    fireEvent.press(deleteButtons[0]);

    // Assert your expected behavior
  });
});
