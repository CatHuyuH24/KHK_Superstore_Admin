const express = require('express');
const Router = express.Router();
const orderController = require('./orderController');
const utils = require('../Utils/jwtUtils');

// Router.use(utils.authMiddleware({ session: true }));
Router.get("/", orderController.getAllOrder);
Router.get("/:id/details", orderController.getOrderById);
Router.patch("/:id/update", orderController.updateOrder);
Router.delete("/:id/delete", orderController.deleteOrder);
Router.get("/search", orderController.getOrderByKeyword);
Router.get("/filter", orderController.filterOrder);

module.exports = Router;