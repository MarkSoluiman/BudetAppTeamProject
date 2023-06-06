const assert = require('assert');
const firebase = require('firebase/app');
require('firebase/auth');

const goodEmail = 'jasmine_amohia@hotmail.com';
const badEmail = 'beyonce@hotmail.com';
const MY_PROJECT_ID = 'mobile-budgeting-app';
const MY_API_KEY = "AIzaSyAg3ZUXj6uDLk-3Ej3pLfwlmwCFD1r9FGM";

// Configure Firebase app to connect to the Firebase Authentication emulator
firebase.initializeApp({
  projectId: MY_PROJECT_ID,
  apiKey: MY_API_KEY,
  authDomain: 'localhost',
  port: 9099,
});

describe('Mobile Budgeting App: Reset Password Functionality', () => {
  it('Sends reset password email for known emails', async () => {
    const auth = firebase.auth();

    try {
      await auth.sendPasswordResetEmail(goodEmail);
      assert.ok(true);
    } catch (error) {
      assert.fail(error);
    }
  });

  it("Doesn't send reset password email for unknown emails", async () => {
    const auth = firebase.auth();

    try {
      await auth.sendPasswordResetEmail(badEmail);
      assert.fail();
    } catch (error) {
      assert.ok(error);
    }
  });
});
