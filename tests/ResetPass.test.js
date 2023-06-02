const {
    email,
    setEmail,
    handleReset,
    auth,
    success
  } = require('./ResetPass');

// TEST CASE 1: Reset password email sent
test('User attempting to reset password where email is valid', () => {
    setEmail('jasmine_amohia@hotmail.com')
    handleReset()
    expect(success).toBe(true);
})

// TEST CASE 2: Password reset with bad email #1
test('User attempting to reset password where email is invalid (numeric)', () => {
    setEmail('897')
    handleReset()
    expect(success).toBe(true);
})

// TEST CASE 3: Password reset with bad email #2
test('User attempting to reset password where email is invalid (whitespace)', () => {
    setEmail(' ')
    handleReset()
    expect(success).toBe(true);
})

// TEST CASE 4: Password reset with bad email #3
test('User attempting to reset password where email is invalid (email not registered)', () => {
    setEmail('billgates@kittycat.com')
    handleReset()
    expect(success).toBe(true);
})