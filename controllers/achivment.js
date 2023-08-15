const mongoose = require('mongoose');
const achivmentModel = require('../models/achivment');
const response = require('../respons/response_valid');
const upload = require('../middleware/filepath');
const multer = require('multer');

module.exports = {
  get: async (req, res) => {
    try {
      const content = await achivmentModel.find();
      response(200, content, 'menampilkan semua content', res);
    } catch (err) {
      response(500, err, 'internal server error \n gagal menampilkan achivment', res);
    }
  },
  getSingle: async (req, res) => {
    id = req.params.id
    try {
      const content = await achivmentModel.findOne({_id:id});
      response(200, content, 'menampilkan semua content', res);
    } catch (err) {
      response(500, err, 'internal server error \n gagal menampilkan achivment', res);
    }
  },
  post: async (req, res) => {
    upload(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        console.log(error.message);
        response(500, error, 'internal server error \n gagal menambahkan gambar achivment 1`', res);
      } else if (error) {
        console.log(error.message);
        response(500, error, 'internal server error \n gagal menambahkan gambar achivment 2', res);
      } else {
        console.log(req.file)
        try {
          const { title, content } = req.body;
          const image = req.file.filename;
          console.log("ini image",image);

          const newAchivment = new achivmentModel({
            title,
            content,
            image,
          });
          await newAchivment.save();
          response(201, newAchivment, 'achivment berhasil di tambahkan', res);
        } catch (error) {
          console.log("error",error.message,error);
          response(500, error, 'internal server error \n gagal menambahkan achivment', res);
        }
      }
    });
  },
  put: async (req, res) => {
    const id = req.params._id;
    upload(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        response(500, error, 'internal server error \n gagal menambahkan gambar achivment', res);
      } else if (error) {
        response(500, error, 'internal server error \n gagal menambahkan gambar achivment', res);
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

          const updatedAchivment = await achivmentModel.findByIdAndUpdate(
            id,
            update,
            { new: true }
          );
          response(200, updatedAchivment, 'achivment berhasil diperbarui', res);
        } catch (error) {
          response(500, error, 'internal server error \n gagal memperbarui achivment', res);
        }
      }
    });
  },
  delete: async (req, res) => {
    try {
      const id = req.params._id;
      const result = await achivmentModel.findByIdAndDelete(id);
      response(200, result, 'achivment berhasil di hapus', res);
    } catch (error) {
      response(500, error, 'internal server error \n gagal menghapus achivment', res);
    }
  },
};
