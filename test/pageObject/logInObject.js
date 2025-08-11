class LogIn {
  get logInButton() {
    return $('~Log in')
  }
  get mobileNumber(){
        return $('android.widget.ImageView')
     }
  get password() {
    return $('android.widget.EditText')
  }
  get dateFilter() {
    return $('~All Time')
  }
  get ForgotPassword(){
    return $('~Forgot Password?')
  }
  get MobileNo(){
    return $('//android.widget.EditText')
  }
  get SendOTP() {
    return $('~Send OTP')
  }
  get OTPField() {
    return driver.$('(//android.widget.EditText)[1]')
  }
  get Verify() {
    return $('~Verify')
  }
  get ResetPassword() {
    return $('//android.view.View[@content-desc="Reset password"]')
  }
  get Save() {
    return $('~Save')
  }
  get PasswordResetSuccessful() {
    return $('~Password reset successful!')
  }
}
module.exports = new LogIn()
