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
            if (error instanceof multer.MulterError) {
                response(500, error, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            } else if (error) {
                response(500, error, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            } else {
                try {
                    const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
                    const image = req.file.filename;
                    let defaultKategori = process.env.DEFAULT_KATEGORI;
                    if (!kategori) {
                        kategori = defaultKategori;
                    }
                    // mencari kategori berdasarkan nama kategori
                    const dataKatagori = await kategoriSchema.findOne({ nama: kategori });
                    const newOfp = new ofpModel({
                        title,
                        content,
                        price,
                        kategori: dataKatagori._id,
                        image,
                        deskripsi,
                        spesifikasi
                    });

                    await newOfp.save();
                    dataKatagori.ofp.push(newOfp);
                    await dataKatagori.save();
                    response(201, { newOfp, dataKatagori }, 'Favorite Product Berhasil ditambahkan', res);
                } catch (error) {
                    response(500, error, 'Internal Server Error \n Gagal menambahkan favorite product', res);
                }
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

    // sort by kategori
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
    //search by title katagori
    search: async (req, res) => {
        try {
            const { dataSearch } = req.body;
            const data = dataSearch.toLowerCase();
            const dataSlice = data.slice(0, 4);
            const content = await ofpModel.find({ title: { $regex: dataSlice, $options: 'i' } }).populate('kategori');
            const kategori = await kategoriSchema.find({ nama: { $regex: dataSlice, $options: 'i' } }).populate('ofp');
            if (content.length === 0 && kategori.length === 0) {
                response(200, 'data tidak ditemukan', 'Menampilkan hasil pencarian', res);
                return;
            }
            const result = [...content, ...kategori];
            const unique = result.filter((item, index) => {
                return result.indexOf(item) === index;
            });

            response(200, unique, 'Menampilkan hasil pencarian', res);

        } catch (err) {

        }
    },
};
