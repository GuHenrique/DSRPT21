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
    statusMessage: Boolean,
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
        routes.getAnimalByType = "/animal/:type"

        return routes;
    }

    setAnimal() {
        return async function (req, res) {

            let code, status, type, infos, latitude, longitude, dtCreate, animal;

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

            req.body.status ? status = req.body.status : status = false;
            infos[0]["location"] = [latitude, longitude];

            let location = {
                type: 'Point',
                coordinates: [latitude, longitude]
            };

            var obj = {
                code,
                status,
                type,
                infos,
                dtCreate,
                location
            };

            try {
                animal = await Animal.create(obj);

            } catch (e) {

                Hermodr.error("controlleres/animal.js | Line 57", e);
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
                Hermodr.error("controlleres/animal.js | Line 78", e);
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
                            coordinates: [latitude, longitude]
                        },
                        $maxDistance: 10000
                    }
                }
            });
            
            return res.json(animals);
        }
    }

    pushUpdate() {
        return async function(req, res){
            
            let code = req.params.code;
            let infos = req.params.infos;
            Animal.updateOne({ 'code' : code },{ $push: {"infos":infos} } ).then(function(results){
        
                return res.json(results);
            }).catch(function(e){
                
                return res.json(results);
                
            })
        }
    }

}


module.exports = AnimalController;