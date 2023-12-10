import { Chat } from '../models/messageModel.js';

class messageController {

  static async createChat(req, res) {
    const nuevoChat = new Chat({ ...req.body });
    const chatInsertado = await nuevoChat.save();
    return res.status(201).json(chatInsertado);
  }

  static async getAllChats(req, res) {
    try {
      const allChats = await Chat.find();
      return res.status(200).json(allChats);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener los chats' });
    }
  }

  static async getChat(req, res) {
    try {
      const chat = await Chat.findById(req.params.id);
      return res.status(200).json(chat);
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el chat' });
    }
  }

  static async deleteChat(req, res) {
    const { id } = req.params;
    try {
      const chatEliminado = await Chat.findByIdAndDelete(id);
      return res.status(200).json(chatEliminado);
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el chat' });
    }
  }

  static async updateChat(req, res) {
    const { id } = req.params;
    const updatedChatData = req.body;

    try {
      await messageModel.findByIdAndUpdate(id, updatedChatData, { new: true });
      const updatedChat = await Chat.findById(id);
      return res.status(200).json(updatedChat);
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el chat' });
    }
  }
}

export default messageController;
