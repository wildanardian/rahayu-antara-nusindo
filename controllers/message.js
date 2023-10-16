const messageSchema = require('../models/message');
const response = require('../respons/response_valid');

module.exports = {
    getAll:async (req, res) => {
        try{
            const messageData = await messageSchema.find();
            response(200,messageData,'menampilkan semua message',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan message',res)
        }
    },
    getOne:async (req, res) => {
        const idMessage = req.params._id;
        try{
            const messageData = await messageSchema.findById(idMessage);
            if(!messageData){
                response(404,null,'message tidak ditemukan',res);
                return;
            }
            data = {
                "test" : "test",
                "data" : messageData
            }
            response(200,data,'menampilkan message',res)
        }catch(error){
            response(500,error,'internal server error \n gagal menampilkan message',res)
        }
    },
    create: async (req, res) => {
        try {
          const { firstName, lastName, email, message, subject } = req.body;
    
          const newMessage = new messageSchema({
            firstName,
            lastName,
            email,
            message,
            subject,
          });
    
          const savedMessage = await newMessage.save();
    
          res.status(201).json({
            message: 'Message successfully added',
            payload: savedMessage,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Internal server error, failed to add message',
            error: error.message,
          });
        }
      },    
    delete:async(req,res)=>{
        const idMessage = req.params._id;
        try{
            const deleteMessage  = await messageSchema.findByIdAndDelete(idMessage);
            if(!deleteMessage){
                response(404,null,'message tidak ditemukan',res);
                return;
            }
            response(200,deleteMessage,'message berhasil dihapus',res)
        }catch(error){
            response(500,error,'internal server error \n gagal menghapus message',res)
        }
    },
    deleteAll:async(req,res)=>{
        try{
            const deleteMessage  = await messageSchema.deleteMany();
            if(!deleteMessage){
                response(404,null,'message tidak ditemukan',res);
                return;
            }
            response(200,deleteMessage,'message berhasil dihapus',res)
        }catch(error){
            response(500,error,'internal server error \n gagal menghapus message',res)
        }
    },
}
