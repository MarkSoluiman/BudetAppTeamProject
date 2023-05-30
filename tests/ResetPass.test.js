import { sendPasswordResetEmail } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import 'firebase-admin';

// TEST CASE 1: Reset password email sent
test('Reset password email sent', async () => {
    // Mock the necessary Firebase SDK methods
    const sendPasswordResetEmailMock = jest.fn();
    firebase.auth.mockReturnValue({ sendPasswordResetEmail: sendPasswordResetEmailMock });

    // Call the function you want to test
    await sendPasswordResetEmail('user@example.com');

    // Assert that the mock function was called with the expected arguments
    expect(sendPasswordResetEmailMock).toHaveBeenCalledWith('user@example.com');
})

// // TEST CASE 2: Password reset with bad password
// test('User attempting to reset password that DOESNT meet password criteria', () => {
//     expect(1).toBe(1);
// })

// // TEST CASE 3: Password reset with good password
// test('User attempting to reset password that DOES meet password criteria', () => {
//     expect(1).toBe(1);
// })
