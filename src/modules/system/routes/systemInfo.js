const {
    Router
} = require('express');
const routes = Router();

const StatusController = require("../controllers/status");
const statusController = new StatusController();
const statusRoutes = statusController.routes();

routes.get(statusRoutes, statusController.status());

module.exports = routes;