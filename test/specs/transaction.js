const logIn= require ('../pageObject/logInObject')
const Transaction= require('../pageObject/transactionObject')


describe('Transaction page', () =>{

it ('Cash in', async ()=>{
     await logIn.logInText.click()
     await logIn.mobileNumber.click()
     await logIn.mobileNumber.addValue('01500000000')
     await logIn.password.click()
     await logIn.password.addValue('A12345678a')
     await LogIn.LogInText.click()
     await Transaction.transactionIcon.click()
     await Transaction.cashFlow.click()
     await Transaction.cashIn.click()
     await Transaction.amountField.click()
     await Transaction.amountField.addValue('1500.34')
     await Transaction.contactField.click()
     await Transaction.contactOptions.click()
     




})


})