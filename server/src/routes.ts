import express, { json } from 'express';

import PointsController from './controllers/PointsController';
import ItensController from './controllers/ItensController';

// index, show, create, update, delete

const routes = express.Router();
const pointsController = new PointsController();
const itensController = new ItensController();


routes.get('/', (request, response) => {
    return response.json({ message: 'Hello World' });
});

routes.get('/itens', itensController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points', pointsController.create);

export default routes;