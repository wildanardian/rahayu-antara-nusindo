const mongoose = require("mongoose");
const ofpModel = require("../models/ofp");
const kategoriSchema = require('../models/kategori')
const response = require("../respons/response_valid");
const upload = require('../middleware/filepath');
require("dotenv").config();
const multer = require("multer");

module.exports = {
    get: async (req, res) => {
        try {
            const content = await ofpModel.find();
            response(200, content, 'menampilkan semua ofp', res)
        } catch (err) {
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    },
    getSingle: async (req, res) => {
        try {
            const id = req.params._id;
            const content = await ofpModel.findById(id);
            response(200, content, 'menampilkan ofp', res)
        } catch (err) {
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    },
    // getSelected:async (req, res) => { // v2 
    //     try {
    //         const content = await ofpModel.find({selected: true});
    //         response(200,content,'menampilkan ofp', res)
    //     }catch(err){
    //         response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
    //     }
    // },


    post: async (req, res) => {
        upload(req, res, async (error) => {
            if (error) {
                console.error(error);
                return response(500, {}, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            }

            try {
                const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
                const image = req.file.filename;

                let kategoriId; // Define variable to hold category ID

                // Search for category based on category name
                const dataKategori = await kategoriSchema.findOne({ nama: kategori });
                if (!dataKategori) {
                    kategoriId = process.env.DEFAULT_KATEGORI;
                } else {
                    kategoriId = dataKategori._id;
                }

                const newOfp = new ofpModel({
                    title,
                    content,
                    price,
                    kategori: kategoriId, // Use category ID
                    image,
                    deskripsi,
                    spesifikasi
                });

                await newOfp.save();
                dataKategori.ofp.push(newOfp);
                await dataKategori.save();
                response(201, { newOfp, dataKategori }, 'Favorite Product Berhasil ditambahkan', res);
            } catch (error) {
                console.error(error);
                response(500, {}, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            }
        });
    },

    put: async (req, res) => {
        const id = req.params._id;
        upload(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
            } else if (error) {
                response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
            } else {
                try {
                    const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
                    const image = req.file.filename;

                    if (kategori) {
                        const katagori = await kategoriSchema.findOne({ nama: kategori });
                        katagori.ofp.push(id);
                        await katagori.save();
                    }else{
                        kategori = process.env.DEFAULT_KATEGORI;
                    }
                    const updatedOfp = await ofpModel.findByIdAndUpdate(id, {
                        title,
                        content,
                        price,
                        kategori,
                        image, 
                        deskripsi,
                        spesifikasi
                    }, { new: true });
                    response(200, updatedOfp, 'Favorite Product berhasil diperbarui', res);
                } catch (error) {
                    console.log(error.message);
                    response(500, error, 'Internal Server Error \n Gagal memperbarui favorite product', res);
                }
            }
        });
    },
    delete: async (req, res) => {
        try {
            const id = req.params._id;
            const result = await ofpModel.findByIdAndDelete(id);
            response(200, result, 'Favorite Product berhasil dihapus', res);
        } catch (error) {
            response(500, error, 'Internal Server Error \n Gagal menghapus favorite product', res)
        }
    },

    // sort by kategori //req.params
    getKategori: async (req, res) => {
        try {
            const { kategori } = req.body;
            const dataKategori = await kategoriSchema.findOne({ nama: kategori }).populate('ofp');
            response(200, dataKategori, 'Menampilkan kategori', res);
        } catch (error) {
            response(500, error, 'Internal Server Error \n Gagal menampilkan kategori', res);
        }
    },
    //sort leatest 
    getLeatest: async (req, res) => {
        try {
            const content = await ofpModel.find().sort({ createdAt: -1 });
            response(200, content, 'menampilkan semua ofp', res)
        } catch (err) {
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    },
    //sort paling awal di buat
    getOldest: async (req, res) => {
        try {
            const content = await ofpModel.find().sort({ createdAt: 1 });
            response(200, content, 'menampilkan semua ofp', res)
        } catch (err) {
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    },
    //search by title katagori  // req.params 
    search: async (req, res) => {
        try {
            const { title } = req.body;
            console.log(title);
            const content = await ofpModel.find({ title: { $regex: title, $options: 'i' } })
            console.log(content);
            res.json({
          
                message: 'menampilkan semua ofp',
                data: content
            })
            
        } catch (err) {
            console.log(err);
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    }
    
    

    
};
