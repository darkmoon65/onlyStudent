import { Router } from 'express';
import messageController from '../controllers/messageController.js';

const chatRouter = Router();

chatRouter.post('/create', messageController.createChat);
chatRouter.get('/all', messageController.getAllChats);
chatRouter.get('/get/:id', messageController.getChat);
chatRouter.delete('/delete/:id', messageController.deleteChat);
chatRouter.put('/update/:id', messageController.updateChat);

export default chatRouter;
