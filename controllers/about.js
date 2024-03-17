const mongoose = require('mongoose');
const aboutModel = require('../models/about');
const response = require('../respons/response_valid');
const upload = require('../middleware/filepath');
const multer = require('multer');

module.exports = {
  get: async (req, res) => {
    try {
      const content = await aboutModel.find();
      response(200, content, 'menampilkan semua content', res);
    } catch (err) {
      response(500, err, 'internal server error \n gagal menampilkan about', res);
    }
  },


  getSingle: async (req, res) => {
    id = req.params.id
    try {
      const content = await aboutModel.findOne({_id:id});
      response(200, content, 'menampilkan semua content', res);
    } catch (err) {
      response(500, err, 'internal server error \n gagal menampilkan about', res);
    }
  },

  
  post: async (req, res) => {
    upload(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        console.log(error.message);
        response(500, error, 'internal server error \n gagal menambahkan gambar about 1`', res);
      } else if (error) {
        console.log(error.message);
        response(500, error, 'internal server error \n gagal menambahkan gambar about 2', res);
      } else {
        console.log(req.file)
        try {
          const { title, content } = req.body;
          const image = req.file.filename;
          console.log("ini image",image);

          const newAbout = new aboutModel({
            title,
            content,
            image,
          });
          await newAbout.save();
          response(201, newAbout, 'about berhasil di tambahkan', res);
        } catch (error) {
          console.log("error",error.message,error);
          response(500, error, 'internal server error \n gagal menambahkan about', res);
        }
      }
    });
  },
  put: async (req, res) => {
    const id = req.params._id;
    upload(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        response(500, error, 'internal server error \n gagal menambahkan gambar about', res);
      } else if (error) {
        response(500, error, 'internal server error \n gagal menambahkan gambar about', res);
      } else {
        try {
          const { title, content } = req.body;
          let update = { title, content };;

          if (req.file) {
              update = {
                title,
                content,
                image: req.file.filename 
              };
          } 

          const updatedAbout = await aboutModel.findByIdAndUpdate(
            id,
            update,
            { new: true }
          );
          response(200, updatedAbout, 'about berhasil diperbarui', res);
        } catch (error) {
          console.log(error.message)  
          response(500, error, 'internal server error \n gagal memperbarui about', res);
        }
      }
    });
  },
  delete: async (req, res) => {
    try {
      const id = req.params._id;
      const result = await aboutModel.findByIdAndDelete(id);
      response(200, result, 'about berhasil di hapus', res);
    } catch (error) {
      response(500, error, 'internal server error \n gagal menghapus about', res);
    }
  },
};
