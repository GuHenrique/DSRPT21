const {
    formattedDateTime
} = require("../../../shared/sources/dateFormatter");
const {
    Hermodr
} = require("../../../shared/sources/hermodr-cmd-express");

const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    code: Number,
    notification: Boolean,
    type: String,
    infos: [],
    dtCreate: String
});

const Animal = mongoose.model('Animal', animalSchema);


class AnimalController {

    routes() {
        let routes = {};

        routes.getAnimal = "/animal/:code";
        routes.animal = "/animal";
        routes.getAnimalByType = "/animal/:type";
        routes.notifications = "/notifications";

        return routes;
    }

    setAnimal() {
        return async function (req, res) {

            let code, notification, type, infos, dtCreate, animal;

            dtCreate = formattedDateTime(new Date());

            if (req.body.code && req.body.code != "" || req.body.type && req.body.type != "") {

                code = req.body.code;
                type = req.body.type;
                infos = req.body.infos;

            } else {
                res.status(400).json({
                    message: "Um ou mais campos estão em branco: code, type, latitude, longitude"
                });
            }

            notification = false;

            var obj = {
                code,
                notification,
                type,
                infos,
                dtCreate
            };

            try {
                animal = await Animal.create(obj);

            } catch (e) {

                Hermodr.error("controlleres/animal.js | Line 83", e);
            }

            return res.json(animal);
        }
    }

    getAnimalByCode() {
        return async function (req, res) {
            let animal;

            try {

                animal = await Animal.find({
                    "code": req.params.code
                }); //{code: req.code}
            } catch (e) {
                Hermodr.error("controlleres/animal.js | Line 100", e);
            }

            return res.json(animal);
        }

    }

    getAnimal() {
        return async function (req, res) {

            var search = {};

            if(req.query.type) search.type = req.query.type;
            
            const animals = await Animal.find(search);

            return res.json(animals);
        }
    }

    patchInfos() {
        return async function (req, res) {

            let code = req.body.code;
            let infos = req.body.infos;

            Animal.updateOne({
                'code': code
            }, {
                $set: {
                    "notification": true
                },
                $push: {
                    "infos": infos
                }
            }).then(function (results) {

                return res.status(200).json(results);
            }).catch(function (e) {

                return res.status(400).json(e);

            })
        }
    }

    getAnimalWithNotification() {
        return async function (req, res) {

            let animal;

            try {

                animal = await Animal.find({
                    "notification": true
                });

            } catch (e) {
                Hermodr.error("controlleres/animal.js | Line 167", e);
            }

            return res.json(animal);
        }
    }

    patchAnimalForNoNotification() {
        return async function (req, res) {

            let code = req.body.code;

            Animal.updateOne({
                'code': code
            }, {
                $set: {
                    "notification": false
                }
            }).then(function (results) {

                return res.status(200).json(results);
            }).catch(function (e) {

                return res.status(400).json(e);

            })
        }
    }
    
}


module.exports = AnimalController;