const mongoose = require('mongoose');
const visiMisiModels = require('../models/fisimisi');
const response = require('../respons/response_valid');

module.exports = {
  get: async (req, res) => {
    try {
      const content = await visiMisiModels.find();
      response(200, content, 'menampilkan semua content', res);
    } catch (err) {
      response(500, err, 'internal server error \n gagal menampilkan visiMisi', res);
    }
  },
  getSingle: async (req, res) => {
    id = req.params.id
    try {
      const content = await visiMisiModels.findOne({ _id: id });
      response(200, content, 'menampilkan semua content', res);
    } catch (err) {
      response(500, err, 'internal server error \n gagal menampilkan visiMisi', res);
    }
  },

  post: async (req, res) => {
    try {
      const { contentVisi, contentMisi } = req.body;

      const newvisiMisi = new visiMisiModels({
        contentVisi,
        contentMisi
      });

      await newvisiMisi.save();
      response(201, newvisiMisi, 'visiMisi berhasil di tambahkan', res);
    } catch (error) {
      console.log("error", error.message);
      response(500, error, 'internal server error \n gagal menambahkan visiMisi', res);
    }
  },


  put: async (req, res) => {
    const id = req.params._id;

    try {
      const { contentVisi, contentMisi } = req.body;
      let update = { contentVisi, contentMisi };

      const updatedvisiMisi = await visiMisiModels.findByIdAndUpdate(id, update, { new: true });

      response(200, updatedvisiMisi, 'visiMisi berhasil diperbarui', res);

    } catch (error) {
      response(500, error, 'internal server error \n gagal memperbarui visiMisi', res);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params._id;
      const result = await visiMisiModels.findByIdAndDelete(id);
      response(200, result, 'visiMisi berhasil di hapus', res);
    } catch (error) {
      response(500, error, 'internal server error \n gagal menghapus visiMisi', res);
    }
  },
};
