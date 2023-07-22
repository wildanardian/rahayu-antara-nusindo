const mongoose = require("mongoose");
const eventModel = require("../models/event");
const response = require("../respons/response_valid")

const upload = require('../middleware/filepath');
const multer = require('multer');

module.exports = {
    get:async (req, res) => {
        try{
            const content = await eventModel.find();
            response(200,content,'menampilkan semua event',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan event',res)
        }
    },
    post: async (req, res) => {
      upload(req, res, async (error) => {
            if(error instanceof multer.MulterError) {
                response(500, error, 'internal server error \n gagal menambahkan gambar event', res);
            }else if (error) {
                response(500, error, 'internal server error \n gagal menambahkan gambar event', res);
            } else {
                try {
                    const { title, description } = req.body;
                    const image = req.file.path;
                    
                    const newEvent = new eventModel({
                        title,
                        description,
                        image,
                    });
                    await newEvent.save();
                    response(201, newEvent, 'event berhasil di tambahkan', res);
                } catch (error) {
                    response(500, error, 'internal server error \n gagal menambahkan event', res);
                }
                }
        });
    },
    put: async (req, res) => {
        const id = req.params._id;
        upload(req, res, async (error) => {
        if (error instanceof multer.MulterError) {
          response(500, error, 'internal server error \n gagal menambahkan gambar event', res);
        } else if (error) {
          response(500, error, 'internal server error \n gagal menambahkan gambar event', res);
        } else {
          try {
            const { title, description } = req.body;
            let update = { title, description };;

            if (req.file) {
                update = {
                    title,
                    description,
                    image: req.file.path 
                };
            } 

            const updatedevent = await eventModel.findByIdAndUpdate(
              id,
              update,
              { new: true }
            );
            response(200, updatedevent, 'event berhasil diperbarui', res);
          } catch (error) {
            console.log(error.message);
            response(500, error, 'internal server error \n gagal memperbarui event', res);
          }
        }
      });
    },
    delete: async (req, res) => {
        const id = req.params._id
        try{
            const deleteEvent = await eventModel.findByIdAndDelete(id)
            response(200,deleteEvent,'Event berhasil di hapus',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menghapus Event',res)
        }
    }
}
