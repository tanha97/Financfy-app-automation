class Sales{
    get salesMenu(){
        return $('~Sales')
    }
    get specificInvoice(){
        return $('~BOO101\n$4,000.00\nPayment pending\n12/06/2025')
    }
    get edit(){
        return $('~Edit')
    }
    

}
module.exports = new Sales