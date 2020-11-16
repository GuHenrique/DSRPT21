const {
    Router
} = require('express');

const routes = Router();

const AnimalController = require("../controllers/animal");
const animalController = new AnimalController();

const animalRoutes = animalController.routes();

routes.get(animalRoutes.animal, animalController.getAnimalByCode());
routes.post(animalRoutes.animal, animalController.setAnimal());

module.exports = routes;