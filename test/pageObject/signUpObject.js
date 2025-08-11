class SignUp{
     
    
     get ConfirmText(){
        return $('~Confirm')
     }
     get WelcomeText(){
        return $('~Welcome back')
     }
     //android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.widget.EditText[2]


     get NameField(){
        return $('//android.widget.ScrollView/android.widget.EditText[2]')
     }
     get Password(){
        return $('//android.widget.ScrollView/android.widget.EditText[4]')
     }
     get ConfirmPassword(){
        return $('//android.widget.ScrollView/android.widget.EditText[5]')
     }
     async SignupScrollIntoView(){
        $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("Sign Up"))')
        .click()
     }
     get VerifyOTPText(){
        return $('~Verify OTP')
     }
     get NumberAlreadyExistText(){
        return $('//android.view.View[@content-desc="phone number already exists"]')
     }
     get WebText(){
        return $('h3.elementor-image-box-title')
     }
     

}
module.exports=new SignUp()