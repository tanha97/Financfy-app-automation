const SignUp = require('../pageObject/signUpObject')

describe('Create Account', () => {
  xit('Create Account with a Valid Data', async () => {
    await SignUp.createaccount.click()
    await SignUp.BusinessAccount.click()
    await SignUp.ConfirmText.click()
    await expect(SignUp.WelcomeText).toBeDisplayed()
    let phoneNumber = await SignUp.MobileNumber
    await phoneNumber.click()
    await phoneNumber.addValue('01500000009')
    await SignUp.NameField.click()
    await SignUp.NameField.addValue('Test Business')
    await SignUp.Password.click()
    await SignUp.Password.addValue('A12345678a')
    await SignUp.ConfirmPassword.click()
    await SignUp.ConfirmPassword.addValue('A12345678a')
    await SignUp.SignupScrollIntoView()
    await expect(SignUp.VerifyOTPText).toBeDisplayed()
  })

  xit('Account Create with Register Mobile Number', async () => {
    await SignUp.Accountcreate.click()
    await SignUp.PersonalAccount.click()
    await SignUp.ConfirmText.click()
    let phoneNumber = await SignUp.MobileNumber
    await phoneNumber.click()
    await phoneNumber.addValue('01500000000')
    await SignUp.NameField.click()
    await SignUp.NameField.addValue('Test Business')
    await SignUp.Password.click()
    await SignUp.Password.addValue('A12345678a')
    await SignUp.ConfirmPassword.click()
    await SignUp.ConfirmPassword.addValue('A12345678a')
    await SignUp.SignupScrollIntoView()
    await expect(SignUp.NumberAlreadyExistText).toBeDisplayed()
  })

  it.only('Business account create & Navigate to Web Page', async () => {
    await SignUp.Accountcreate.click()
    await SignUp.BusinessAccount.click()
    await SignUp.ConfirmText.click()

    //assert the cover image is showed
    
    await driver.switchContext('WEBVIEW_chrome')
    let coverImage= await $('.attachment-full.size-full.wp-image-2205')
    await expect(coverImage).toBeDisplayed()
  })
})
