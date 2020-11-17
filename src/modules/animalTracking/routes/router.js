const {
    Router
} = require('express');

const routes = Router();

const AnimalController = require("../controllers/animal");
const animalController = new AnimalController();

const animalRoutes = animalController.routes();

routes.get(animalRoutes.getAnimal, animalController.getAnimalByCode());
routes.post(animalRoutes.animal, animalController.setAnimal());
routes.get(animalRoutes.animal, animalController.getAnimal());
routes.patch(animalRoutes.animal, animalController.pushUpdate());

module.exports = routes;