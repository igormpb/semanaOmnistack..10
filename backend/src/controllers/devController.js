const axios = require('axios');
const Dev = require('../models/devs');
const parseStringAsArray = require('../utlis/parseStringAsArray');

module.exports = {

    async index(request,response){
        const devs = await Dev.find();
        
        return response.json(devs);
    },


    
    async store(request,response){
        const { github_user, techs, longitude, latitude} = request.body;
    let dev = await Dev.findOne({ github_user });
    if(!dev) {
    
        
    
        const apiResponde = await axios.get(`https://api.github.com/users/${github_user}`);
        const {name = login ,bio,avatar_url} = apiResponde.data;
    
        const techsArray = parseStringAsArray(techs);
        const location = {
            type: 'Point',
            coordinates: [longitude,latitude],
        }
        dev = await Dev.create({
            github_user,
            name,
            bio,
            avatar_url,
            techs: techsArray,
            location,
        });
    
       return response.json(dev);
    }
    }

    
        
}