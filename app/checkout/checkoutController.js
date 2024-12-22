const checkoutService = require('./checkoutService');

const renderCheckoutPage=async (req,res)=>{
    try{
        const user_id = res.locals.user ? res.locals.user.id : null;
        const {products, totalSum, totalDiscount, totalPay}=await checkoutService.getProductInCartByUserIdToOrder(user_id);

        const response = {
            title: 'Order Page - Superstore',
            error: false,
            products: products,
            totalSum: totalSum,
            totalDiscount: totalDiscount,
            user_id:user_id,
            totalPay: totalPay
          };

        
         return res.render('checkout', response);
    }catch(error){
        console.error('Error rendering order page:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

module.exports = {
    renderCheckoutPage
};