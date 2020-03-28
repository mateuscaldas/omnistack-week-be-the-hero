const generateUniqueId = require('../utils/generateUniqueId');

const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, state} = request.body;

        const id = generateUniqueId();

        /*
            Before inserting a new ONG, must have a check if the ID is unique.  
        */
        const ongs = await connection('ongs')
            .where('id', id)
            .select('id')
            .first()

        if (!ongs) {
            await connection('ongs').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                state
            });

            return response.json({ id });
        }            
    }
};