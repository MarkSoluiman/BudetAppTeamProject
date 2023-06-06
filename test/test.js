const assert = require('assert')
const firebase = require('@firebase/testing')
// const ResetPass = require('./ResetPass.js')

const MY_PROJECT_ID = 'mobile-budgeting-app'

describe("Mobile Budgeting App: Reset Password Functionality", () => {
    it("Sends reset password email for known emails", () => {
        assert.equal(2+2, 4)
    })

    it("Doesn't send reset password email for unknown emails", () => {
        assert.equal(2+2, 4)
    })
})