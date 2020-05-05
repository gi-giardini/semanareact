const axios = require('axios');
const Dev = require('../models/devs');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Controller, geralment, tem 5 métodos: index, show, store, update, destroy

module.exports = {
    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await devs.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
            // linha para que a busca (query) feita apareça no terminal
            // console.log(apiResponse.data);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
            // if(!name){
                // name = apiResponse.data.login;
            // }

            const techArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await devs.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location
            });
        
            console.log(name, avatar_url, bio);
        }
    
        // return response.json({ message: 'Welcome to Giovana\'s Website.'});
        return response.json(dev);
    }
}