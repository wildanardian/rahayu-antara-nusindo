const mongoose = require("mongoose");
const ofpModel = require("../models/ofp");
const response = require("../respons/response_valid");
const upload = require('../middleware/filepath');
const multer = require("multer");

module.exports = {
    get:async (req, res) => {
        try {
            const content = await ofpModel.find();
            response(200,content,'menampilkan semua ofp', res)
        }catch(err){
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    },

    post: async(req, res) => {
        upload(req, res, async(error) => {
            if(error instanceof multer.MulterError){
                response(500, error, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            }else if(error){
                response(500, error, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            }else {
                try {
                    const {title, description} = req.body;
                    const image = req.file.path;

                    const newOfp = new ofpModel({
                        title,
                        description,
                        image,
                    });
                    await newOfp.save();
                    response(201, newOfp, 'Favorite Product Berhasil ditambahkan', res);
                } catch (error) {
                    response(500, error, 'Internal Server Error \n Gagal menambahkan favorite product', res);
                }
            }
        });
    },
    put: async(req, res) => {
        const id = req.params._id;
        upload(req, res, async(error) => {
            if(error instanceof multer.MulterError){
                response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
            }else if(error) {
                response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
            }else {
                try {
                    const {title, description} = req.body;
                    const image = req.file.path;

                    const updatedOfp = await ofpModel.findbyIdAndUpdate(
                        id,
                        {
                            title,
                            description,
                            image,
                        },
                        {new: true}
                    );
                    response(200, updatedOfp, 'Favorite Product berhasil diperbarui', res);
                } catch (error) {
                    response(500, error, 'Internal Server Error \n Gagal memperbarui favorite product', res);
                }
            }
        });
    },
    delete: async(req, res) => {
        try {
            const id = req.params._id;
            const result = await ofpModel.findbyIdAndDelete(id);
            response(200, result, 'Favorite Product berhasil dihapus', res);
        }catch(error){
            response(500, error, 'Internal Server Error \n Gagal menghapus favorite product')
        }
    },
};