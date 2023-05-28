// Import necessary dependencies and components
import { render, fireEvent } from '@testing-library/react-native';
import TransactionLog from './TransactionLog';
import firebase from 'firebase';

// Mock Firebase dependencies
jest.mock('firebase', () => ({
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: jest.fn(() =>
        Promise.resolve({
          docs: [
            { id: 'transaction1', data: () => ({ title: 'Transaction 1' }) },
            { id: 'transaction2', data: () => ({ title: 'Transaction 2' }) },
          ],
        })
      ),
      doc: jest.fn().mockReturnThis(),
      delete: jest.fn().mockReturnValue(Promise.resolve()),
    })),
  })),
}));

describe('TransactionLog', () => {
  it('displays a list of transactions', async () => {
    // Render the TransactionLog component
    const { findAllByTestId } = render(<TransactionLog />);
  
    // Wait for the component to load and retrieve transactions
    const transactions = await findAllByTestId('transaction');
  
    // Assert that the correct number of transactions is displayed
    expect(transactions.length).toBe(2);
  });

  it('allows deleting a transaction', async () => {
    // Render the TransactionLog component
    const { findAllByTestId, getByTestId } = render(<TransactionLog />);
  
    // Wait for the component to load and retrieve transactions
    const transactions = await findAllByTestId('transaction');
  
    // Find the delete button for the first transaction
    const deleteButton = getByTestId('delete-transaction1');
  
    // Trigger the delete action
    fireEvent.press(deleteButton);
  
    // Assert that the delete function is called with the correct parameters
    expect(firebase.firestore().collection().doc).toHaveBeenCalledWith('transaction1');
    expect(firebase.firestore().collection().doc().delete).toHaveBeenCalled();
  });
});
