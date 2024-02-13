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
        upload.single(req, res, async (error) => {
            if (error) {
                console.error(error);
                return response(500, {}, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            }

            try {
                const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
                const image = req.file.filename;

                const newOfp = new ofpModel({ 
                    title,
                    content,
                    price,
                    image,
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
                response(201, { newOfp, dataKategori }, 'Favorite Product Berhasil ditambahkan', res);
            } catch (error) {
                console.error(error);
                response(500, {}, 'Internal Server Error \n Gagal menambahkan favorite product', res);
            }
        });
    },
    // put: async (req, res) => {
    //     const id = req.params._id;
    //     upload.single(req, res, async (error) => {
    //         if (error instanceof multer.MulterError) {
    //             response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
    //         } else if (error) {
    //             response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
    //         } else {
    //             try {
    //                 const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
    //                 let image = null;
    
    //                 if (req.file) {
    //                     image = req.file.filename;
    //                 }
    
    //                 let updatedKategori = kategori;
    
    //                 const existingOfp = await ofpModel.findById(id);
    //                 if (!existingOfp) {
    //                     return response(404, null, 'Favorite Product not found', res);
    //                 } else {
    //                     if (!req.file) {
    //                         image = existingOfp.image;
    //                     }
    //                 }
                    
    //                 const updatedOfp = await ofpModel.findByIdAndUpdate(id, {
    //                     title,
    //                     content,
    //                     price,
    //                     kategori: updatedKategori, 
    //                     image,
    //                     deskripsi,
    //                     spesifikasi
    //                 }, { new: true });
    //                 response(200, updatedOfp, 'Favorite Product berhasil diperbarui', res);
    //             } catch (error) {
    //                 console.log(error.message);
    //                 response(500, error, 'Internal Server Error \n Gagal memperbarui favorite product', res);
    //             }
    //         }
    //     });
    // },

    put: async (req, res) => {
        const id = req.params._id;
        upload.single(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                console.log("Error during file upload:", error);
                response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
            } else if (error) {
                console.log("Unknown error during file upload:", error);
                response(500, error, 'Internal Server Error \n Gagal menambahkan gambar favorite product', res);
            } else {
                try {
                    const { title, content, price, kategori, deskripsi, spesifikasi } = req.body;
                    let image = null;
    
                    if (req.file) {
                        console.log("New image received:", req.file);
                        image = req.file.filename;
                    }
    
                    let updatedKategori = kategori;
    
                    const existingOfp = await ofpModel.findById(id);
                    if (!existingOfp) {
                        console.log("Favorite product not found with ID:", id);
                        return response(404, null, 'Favorite Product not found', res);
                    } else {
                        if (!req.file) {
                            console.log("No new image received. Keeping existing image:", existingOfp.image);
                            image = existingOfp.image;
                        }
                    }
                    
                    const updatedOfp = await ofpModel.findByIdAndUpdate(id, {
                        title,
                        content,
                        price,
                        kategori: updatedKategori, 
                        image,
                        deskripsi,
                        spesifikasi
                    }, { new: true });
                    console.log("Favorite product successfully updated:", updatedOfp);
                    response(200, updatedOfp, 'Favorite Product berhasil diperbarui', res);
                } catch (error) {
                    console.log("Error during product update:", error.message);
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
            const { kategori } = req.params;
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

    search: async (req, res) => {
        try {
            const { title } = req.params;
            const content = await ofpModel.find({ title: { $regex: title, $options: 'i' } })
            const kategori = await kategoriSchema.find({ nama: { $regex: title, $options: 'i' } })
            
            if (content.length === 0 && kategori.length === 0) {
                return res.status(404).json({ message: 'Data tidak ditemukan' });
            }
    
            const result = {
                "product" : content,
                "kategori" : kategori
            }

    
            return res.status(200).json({ data: result, message: 'Menampilkan hasil pencarian' });

            
        } catch (err) {
            console.log(err);
            response(500, err, 'Internal server error \n Gagal menampilkan ofp', res)
        }
    }
    
    

    
};
