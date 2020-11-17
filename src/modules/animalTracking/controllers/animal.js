const {
    formattedDateTime
} = require("../../../shared/sources/dateFormatter");
const {
    Hermodr
} = require("../../../shared/sources/hermodr-cmd-express");
//const { Animal } = require("../models/animal");
const mongoose = require('mongoose');
const PointSchema = require('../../system/models/PointSchema');

const animalSchema = new mongoose.Schema({
    code: Number,
    notification: Boolean,
    type: String,
    infos: [],
    dtCreate: String,
    location: {
        type: PointSchema,
        index: '2dsphere'
    }
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

            let code, notification, type, infos, latitude, longitude, dtCreate, animal;

            console.log(req.body.code, req.body.type, req.body.latitude, req.body.longitude);
            dtCreate = formattedDateTime(new Date());

            if (req.body.code && req.body.code != "" || req.body.type && req.body.type != "" || req.body.latitude && req.body.latitude != "" || req.body.longitude && req.body.longitude != "") {

                code = req.body.code;
                type = req.body.type;
                latitude = req.body.latitude;
                longitude = req.body.longitude;
                infos = req.body.infos;

            } else {
                res.status(400).json({
                    message: "Um ou mais campos estão em branco: code, type, latitude, longitude"
                });
            }

            infos[0]["location"] = [latitude, longitude];
            notification = false;

            let location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            };

            var obj = {
                code,
                notification,
                type,
                infos,
                dtCreate,
                location
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

            let latitude = req.query.lat;
            let longitude = req.query.lon;

            const animals = await Animal.find({
                location: {
                    $near: {
                        $geometry: {
                            coordinates: [req.query.lat, req.query.lon]
                        },
                        $maxDistance: 10000
                    }
                }
            });

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
    
    patchGeolocation() {
        return async function (req, res) {

            let code = req.body.code;
            let location = {
                type: 'Point',
                coordinates: [req.body.lat, req.body.lon]
            };

            Animal.updateOne({
                'code': code
            }, {
                $set: location
            }).then(function (results) {

                return res.status(200).json(results);
            }).catch(function (e) {

                return res.status(400).json(e);

            })
        }
    }
}


module.exports = AnimalController;