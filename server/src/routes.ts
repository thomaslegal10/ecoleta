import express, { json } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

routes.get('/itens', async (request, response) => {
    const itens = await knex('itens').select('*');

    const serializedItens = itens.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: 'http://localhost:3333/uploads/'+item.image,
        };
    });

    return response.json(serializedItens);
});

routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        itens
    } = request.body;

    const trx = await knex.transaction();

    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedIds

    const pointItens = itens.map((item_id: number) => {
        return {
            item_id,
            point_id: point_id,
        }
    });

    await trx('point_itens').insert(pointItens);

    return response.json({ success: true });
});

export default routes;