const Dev = require('../models/devs');
const parseStringAsArray = require('../utlis/parseStringAsArray');

module.exports = {
    async index(request,response){

        const {latitude, longitude, techs} = request.query;
        techsArray = parseStringAsArray(techs);
        console.log(techsArray)

        const devs = {
            techs : {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        }
        return response.json({devs : []});
    }
}