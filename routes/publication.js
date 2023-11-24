import { Router } from 'express';
import publicationController from '../controllers/publicationController.js';

const publicationRouter = Router();

publicationRouter.post('/create', publicationController.createPublication);
publicationRouter.get('/all', publicationController.getAllPublications);
publicationRouter.get('/get/:id', publicationController.getPublication);
publicationRouter.put('/update/:id', publicationController.updatePublication);
publicationRouter.delete('/delete/:id', publicationController.deletePublication);

export default publicationRouter;
