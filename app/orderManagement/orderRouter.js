const express = require('express');
const Router = express.Router();
const orderController = require('./orderController');
const utils = require('../Utils/jwtUtils');

// Router.use(utils.authMiddleware({ session: true }));
Router.get("/", utils.authMiddleware({ session: true }),orderController.getAllOrder);
Router.get("/:id/details",utils.authMiddleware({ session: true }), orderController.getOrderById);
Router.patch("/:id/update", utils.authMiddleware({ session: true }),orderController.updateOrder);
Router.delete("/:id/delete",utils.authMiddleware({ session: true }), orderController.deleteOrder);
Router.get("/search",utils.authMiddleware({ session: true }), orderController.getOrderByKeyword);
Router.get("/filter",utils.authMiddleware({ session: true }), orderController.filterOrder);

module.exports = Router;