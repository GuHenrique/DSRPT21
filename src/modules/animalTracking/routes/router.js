const {
    Router
} = require('express');

const routes = Router();

const AnimalController = require("../controllers/animal");
const animalController = new AnimalController();

const animalRoutes = animalController.routes();

console.log(animalRoutes.notifications)
routes.get(animalRoutes.getAnimal, animalController.getAnimalByCode());
routes.post(animalRoutes.animal, animalController.setAnimal());
routes.get(animalRoutes.animal, animalController.getAnimal());
routes.patch(animalRoutes.animal, animalController.patchInfos());
routes.get(animalRoutes.notifications, animalController.getAnimalWithNotification());
routes.patch(animalRoutes.notifications, animalController.patchAnimalForNoNotification());


module.exports = routes;