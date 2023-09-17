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
    getSingle:async (req, res) => {
        try {
            const id = req.params._id;
            const content = await ofpModel.findById(id);
            response(200,content,'menampilkan ofp', res)
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
                    const {title, content,price} = req.body;
                    const image = req.file.filename;

                    const newOfp = new ofpModel({
                        title,
                        content,
                        price,
                        image               
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
                    const { title, content,price } = req.body;
                    let update = { title, content };;
        
                    if (req.file) {
                        update = {
                            title,
                            content,
                            price,
                            image: req.file.filename 
                        };
                    }

                    const updatedOfp = await ofpModel.findByIdAndUpdate(
                        id,
                        update,
                        {new: true}
                    );
                    response(200, updatedOfp, 'Favorite Product berhasil diperbarui', res);
                } catch (error) {
                    console.log(error.message);
                    response(500, error, 'Internal Server Error \n Gagal memperbarui favorite product', res);
                }
            }
        });
    },
    delete: async(req, res) => {
        try {
            const id = req.params._id;
            const result = await ofpModel.findByIdAndDelete(id);
            response(200, result, 'Favorite Product berhasil dihapus', res);
        }catch(error){
            response(500, error, 'Internal Server Error \n Gagal menghapus favorite product',res)
        }
    },
};
