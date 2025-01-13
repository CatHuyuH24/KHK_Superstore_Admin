const orderService = require("./orderService");


async function getAllOrder(req, res){
    try {
        const orders = await orderService.getAllOrder();

        return res.render("orderManagement", {
            title: "Order",
            orders: orders
        })
    } catch (error) {
        console.log(error);
    }
}

async function getOrderById(req, res){
    try {
        const orderId = req.params.id;
        const orderDetails = await orderService.getOrderById(orderId);
     
        const customerInfo=await orderService.getUsetInfoById(orderDetails[0].user_id);
        // console.log(customerInfo);
         res.json({
            ok: true,
            details: orderDetails,
            customerInfo:customerInfo
        });
    } catch (error) {
         res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

// Update order
async function updateOrder  (req, res)  {
    const id = req.params.id;
    const status = req.body.status;
    const payment_status = req.body.payment_status;
    try {
        const order = await orderService.updateOrder(id, status, payment_status);
        if (order) {
             res.status(200).json({
                ok: true,
                order: order
            })
        }
        else {
             res.status(400).json({ ok: false })
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

async function getOrderByKeyword  (req, res)  {
    const keyword = req.query.keyword;
    console.log(keyword);
    try {
        const orders = await orderService.getOrderByKeyword(keyword);
        
        return res.render("orderManagement", {
            title: "Order",
            orders: orders
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

async function filterOrder  (req, res)  {
    console.log(req.query);

    let status = req.query.status;
    let payment_status = req.query.payment_status;

    if(status === 'In_Transit'){
        status = 'In Transit';
    }

    try {
        const orders = await orderService.filterOrder(status, payment_status);
        
        return res.render("orderManagement.ejs", {
            title: "Order",
            orders: orders,
            status: status,
            payment_status: payment_status
        });
           
    
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }    
}

async function deleteOrder  (req, res)  {
    const id = req.params.id;
    
    console.log(id);

    try {
        const result = await orderService.deleteOrder(id);
        const order=await orderService.getAllOrder();
        if (result) {
            res.status(200).json({
                ok: true,
                order:order
            });
        }
        else {
            res.status(400).json({
                ok: false,
                order:order
            });
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

module.exports={
    getAllOrder,
    getOrderById,
    updateOrder,
    getOrderByKeyword,
    filterOrder,
    deleteOrder
};