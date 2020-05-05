const Dev = require('../models/devs');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        // Buscar todos os devs em um raio de 10km
        // Filtrar por tecnologia
        const { latitude, longitude, techs} = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: techsArray, //devs que estão dentro daquelas tecnologias
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxdistance: 10000,                  
                },
            },
        });

        return response.json({ devs });
    }
}