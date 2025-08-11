class Transactions{
    get transactionIcon(){
        return $('~Transaction')
    }
    get cashFlow(){
        return $('~Cash flow')
    }
    get cashIn(){
        return $('//android.widget.ImageView[@content-desc="Cash in"]')
    }
    get amountField(){
        return $('android.widget.EditText')
    }
    get contactField(){
        return $('//android.widget.ScrollView/android.widget.ImageView[3]')
    }

    get contactOptions(){
        return $(`android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description('Anud Customer'))`)

    }
    

    

}
module.exports= new Transactions()