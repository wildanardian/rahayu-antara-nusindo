const mongoose = require("mongoose");
const mediaReleaseSchema = require("../models/mediaRelease");
const response = require("../respons/response_valid")

const upload = require('../middleware/filepath');
const multer = require('multer');

module.exports = {
    get:async (req, res) => {
        try{
            const content = await mediaReleaseSchema.find();
            response(200,content,'menampilkan semua event',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan event',res)
        }
    },
    getOne: async (req, res) => {
        const id = req.params._id;
        try {
            const content = await mediaReleaseSchema.findById(id);
            if (!content) {
                response(404, null, 'Event tidak ditemukan', res);
                return;
            }
            response(200, content, 'menampilkan event', res);
        } catch (err) {
            console.log(err.message);
            response(500, err, 'internal server error \n gagal menampilkan event', res);
        }
    },
    post: async (req, res) => {
        upload(req, res, async (error) => {
          if (error instanceof multer.MulterError) {
            console.log(error.message);
            response(500, error, 'internal server error \n gagal menambahkan gambar event', res);
          } else if (error) {
            console.log(error.message);
            response(500, error, 'internal server error \n gagal menambahkan gambar event', res);
          } else {
            try {
              const { title, content, status } = req.body;
              if (!req.file) {
                response(400, null, 'Berkas gambar (image) diperlukan', res);
                return;
              }
      
              const image = req.file.filename;
              const newEvent = new mediaReleaseSchema({
                title,
                content,
                image
              });
              await newEvent.save();
              response(201, newEvent, 'event berhasil di tambahkan', res);
            } catch (error) {
              console.log(error.message);
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
            const { title, content,status } = req.body;
            let update = { title, content,status };

            if (req.file) {
                update = {
                    title,
                    content,
                    image: req.file.path 
                };
            } 

            const updatedevent = await mediaReleaseSchema.findByIdAndUpdate(id,update,{ new: true });
            response(200, updatedevent, 'event berhasil diperbarui', res);
          } catch (error) {
            console.log(error.message);
            response(500, error, 'internal server error \n gagal memperbarui event', res);
          }
        }
      });
    },
    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteEvent = await mediaReleaseSchema.findByIdAndDelete(id);
            if (!deleteEvent) {

                response(404, null, 'Event tidak ditemukan', res);
                return;
            }
            response(200, deleteEvent, 'Event berhasil dihapus', res);
        } catch (err) {
            console.log(err.message);
            response(500, err, 'Internal server error \n Gagal menghapus Event', res);
        }
    }
    
    
}
