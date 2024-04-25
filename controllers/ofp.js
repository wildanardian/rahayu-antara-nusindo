const mongoose = require("mongoose");
const ofpModel = require("../models/ofp");
const kategoriSchema = require('../models/kategori')
const response = require("../respons/response_valid");
const upload = require('../middleware/filepath');
require("dotenv").config();
const multer = require("multer");
const fs = require('fs');

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
            const content = await ofpModel.findById(id).populate('kategori');
            
            response(200, content, 'menampilkan ofp', res)
        } catch (err) {
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    },

    // controller get last add product and last update product
    getLatest: async (req, res) => {
        try {
            const lastUpdate = await ofpModel.findOne().sort({ updatedAt: -1 });
            const lastAdd = await ofpModel.findOne().sort({ createdAt: -1 });
            // ambil data updatedAt dan createdAt dari lastUpdate dan lastAdd
            const result = {
                lastUpdate: {
                    title: lastUpdate.title,
                    updatedAt: lastUpdate.updatedAt
                },
                lastAdd: {
                    title: lastAdd.title,
                    createdAt: lastAdd.createdAt
                }
            }
            response(200, result, 'menampilkan ofp', res)
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
        upload.many(req, res, async (error) => {
            if (error) {
                console.error(error.message);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
                return;
            }

            try {
                const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
                const images = req.files.map((file) => file.filename);
                const newOfp = new ofpModel({
                    title,
                    content,
                    price,
                    kategori,
                    image: images,
                    deskripsi,
                    spesifikasi
                });
                let kategoriId;

                const dataKategori = await kategoriSchema.findOne({ nama: kategori });
                const dataNonKategori = await kategoriSchema.findById(process.env.DEFAULT_KATEGORI);


                if (!dataKategori) {
                    kategoriId = process.env.DEFAULT_KATEGORI;
                    dataNonKategori.ofp.push(newOfp);
                    newOfp.kategori = kategoriId;
                    await dataNonKategori.save();
                    await newOfp.save();

                } else {
                    kategoriId = dataKategori._id;
                    dataKategori.ofp.push(newOfp);
                    newOfp.kategori = kategoriId;
                    await dataKategori.save();
                    await newOfp.save();
                }

                res.status(201).send({ message: 'Favorite Product berhasil ditambahkan', data: newOfp });
            } catch (error) {
                console.error(error.message);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
            }
        });
    },

    put: async (req, res) => {
        const id = req.params._id;
        upload.many(req, res, async (error) => {
            if (error) {
                console.error(error.message);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
                return;
            }
            const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
            const { confirmUpdateImage } = req.body;
            const updatedProduct = {
                title,
                content,
                price,
                kategori,
                deskripsi,
                spesifikasi
            };

            let images = [];
            if (confirmUpdateImage === 'true') {
                // menghapus gambar lama
                const product = await ofpModel.findById(id);
                product.image.forEach((image) => {
                    fs.unlinkSync(`assets/${image}`);
                });
                // menambahkan gambar baru
                images = req.files.map((file) => file.filename);
                updatedProduct.image = images;
            }
            try {
                const result = await ofpModel.findByIdAndUpdate(id, updatedProduct, { new: true });
                res.status(200).send({ message: 'Product updated successfully', data: result });
            } catch (error) {
                console.error(error.message);
                res.status(500).send({ message: 'Internal Server Error', error: error.message });
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
            const { kategori } = req.params;
            const dataKategori = await kategoriSchema.findOne({ nama: kategori }).populate('ofp');
            response(200, dataKategori, 'Menampilkan kategori', res);
        } catch (error) {
            response(500, error, 'Internal Server Error \n Gagal menampilkan kategori', res);
        }
    },
    //sort leatest 
    // getLeatest: async (req, res) => {
    //     try {
    //         const content = await ofpModel.find().sort({ createdAt: -1 });
    //         response(200, content, 'menampilkan semua ofp', res)
    //     } catch (err) {
    //         response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
    //     }
    // },
    // //sort paling awal di buat
    // getOldest: async (req, res) => {
    //     try {
    //         const content = await ofpModel.find().sort({ createdAt: 1 });
    //         response(200, content, 'menampilkan semua ofp', res)
    //     } catch (err) {
    //         response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
    //     }
    // },

    // search: async (req, res) => {
    //     try {
    //         const { title } = req.params;
    //         const content = await ofpModel.find({ title: { $regex: title, $options: 'i' } })
    //         const kategori = await kategoriSchema.find({ nama: { $regex: title, $options: 'i' } })

    //         if (content.length === 0 && kategori.length === 0) {
    //             return res.status(404).json({ message: 'Data tidak ditemukan' });
    //         }

    //         const result = {
    //             "product": content,
    //             "kategori": kategori
    //         }


    //         return res.status(200).json({ data: result, message: 'Menampilkan hasil pencarian' });


    //     } catch (err) {
    //         console.log(err);
    //         response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
    //     }
    // },
    searchAndSort: async (req, res) => {
        try {
            const { search, sort, kategori } = req.params;
            var result
            if (search != '-1') {
                result = await ofpModel.find({ title: { $regex: search, $options: 'i' } });
            } else {
                result = await ofpModel.find();
            }

            if (sort) {
                if (sort === "oldest") {
                    result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                } else if (sort === "latest") {
                    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                }
            }

            if (kategori !== 'none' && kategori !== undefined) {
                const kategoriDoc = await kategoriSchema.findOne({ nama: kategori });
    
                if (kategoriDoc) {
                    result = result.filter(item => item.kategori?.toString() === kategoriDoc._id?.toString());
                } else {
                    console.log(`Kategori "${kategori}" tidak ditemukan.`);
                }
            }
            response(200, result, 'berhasil menampilkan data', res)
        } catch (err) {
            console.log(err);
            response(500, err, 'Internal server error. Gagal menampilkan ofp', res)
        }
    }

};
