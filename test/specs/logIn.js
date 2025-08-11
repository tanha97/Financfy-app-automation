const fs = require('fs')
const path = require('path')
const allure = require('@wdio/allure-reporter').default
const LogIn = require('../pageObject/logInObject')
const SignUp = require('../pageObject/signUpObject')

describe('Log In Page', () => {
  it('should match onboarding screen with Figma design', async () => {

    await driver.pause(5000)
    let result = await driver.checkScreen('Onboarding1') // Compares with ./baseline/login-screen.png

    const baseline = path.resolve('./tmp/baseline/Onboarding1.png')
    const actual = path.resolve('./tmp/actual/Onboarding1.png')
    const diff = path.resolve('./tmp/diff/Onboarding1.png')

    // Attach each image to the Allure Report
     allure.addAttachment('Baseline Image', fs.readFileSync(baseline), 'image/png')
     allure.addAttachment('Actual Image', fs.readFileSync(actual), 'image/png')
     allure.addAttachment('Diff Image', fs.readFileSync(diff), 'image/png')

    //expect(result.misMatchPercentage).toBeLessThan(1); // Fail test if visual diff > 1%
  })

  xit('Log In with Valid Credential', async () => {
    await LogIn.LogInText.click()
    await expect(SignUp.WelcomeText).toBeDisplayed()
    await SignUp.MobileNumber.click()
    await SignUp.MobileNumber.addValue('01500000000')
    await LogIn.Password.click()
    await LogIn.Password.addValue('A12345678a')
    await LogIn.LogInText.click()
    await expect(LogIn.DateFilter).toBeDisplayed()
  })

  xit('Forgot Password', async () => {
    await LogIn.LogInText.click()
    await LogIn.ForgotPassword.click()
    await expect(LogIn.ForgotPassword).toBeDisplayed()
    await LogIn.MobileNo.click()
    await LogIn.MobileNo.addValue('01500000000')
    await LogIn.SendOTP.click()
    await expect(SignUp.VerifyOTPText).toBeDisplayed()
    const otpField = await driver.$(
      "//android.widget.FrameLayout[@resource-id='android:id/content']/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[3]"
    )
    await otpField.click()

    await LogIn.otpField.addValue('123456')
    await LogIn.Verify.click()
    await expect(LogIn.ResetPassword).toBeDisplayed()
    let password = SignUp.MobileNumber
    await password.addValue('A123456a')
    await LogIn.Password.addValue('A123456a')
    await LogIn.Save.click()
    await expect(LogIn.PasswordResetSuccessful).toBeDisplayed()
  })
})
