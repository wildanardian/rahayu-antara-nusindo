const bannerSchema = require('../models/banner')
const response = require('../respons/response_valid');
const multer = require('multer');
const upload = require('../middleware/filepath');
const { getLeatest } = require('./ofp');

module.exports = {
    get:async (req,res) =>{
        try{
            const data = await bannerSchema.find();
            response(200,data,'menampilkan seluruh banner ', res)

        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menampilakn banner ', res)
        }
    },

    getLeatest: async (req, res) => {
        try{
            const lastUpdate = await bannerSchema.findOne().sort({updatedAt: -1});
            const lastAdd = await bannerSchema.findOne().sort({createdAt: -1});
            const result = {
                lastUpdate: {
                    nama: lastUpdate.nama,
                    updatedAt: lastUpdate.updatedAt
                },
                lastAdd: {
                    nama: lastAdd.nama,
                    createdAt: lastAdd.createdAt
                }
            }
            response(200,result,'menampilkan banner', res)
        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menampilkan banner', res)
        }
    },
    post:async(req,res) =>{
        upload.single(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                console.log(error.message);
                response(500, error, 'internal server error \n gagal menambahkan gambar banner', res);
            } else if (error) {
                console.log(error.message);
                response(500, error, 'internal server error \n gagal menambahkan gambar banner', res);
            } else {
                try {
                    const { nama } = req.body;
                    if (!req.file) {
                        response(400, null, 'Berkas gambar (image) diperlukan', res);
                        return;
                    }
            
                    const image = req.file.filename;
                    const newData = new bannerSchema({
                        nama,
                        image
                    });
                    await newData.save();
                    response(201, newData, 'banner berhasil di tambahkan', res);
                } catch (error) {
                    console.log(error.message);
                    response(500, error, 'internal server error \n gagal menambahkan banner', res);
                }
            }
        });
    },
    put: async (req, res) => {
        const id = req.params._id;
        upload.single(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                response(500, error, 'internal server error \n gagal menambahkan gambar banner', res);
            } else if (error) {
                response(500, error, 'internal server error \n gagal menambahkan gambar banner', res);
            } else {
                try {
                    const { nama } = req.body;
                    let update = { nama };

                    if (req.file) {
                        update = {
                            nama,
                            image: req.file.filename
                        };
                    }
                    const newData = await bannerSchema.findByIdAndUpdate(id, update);
                    await newData.save();
                    response(200, newData, 'banner berhasil di update', res);
                } catch (error) {
                    console.log(error.message);
                    response(500,
                        error,
                        'internal server error \n gagal memperbarui banner',
                        res
                    );
                }
            }
        });
    },

    
    delete: async (req, res) => {
        try {
            const id = req.params._id;
            await bannerSchema.findByIdAndRemove(id);
            response(200, null, 'banner berhasil di hapus', res);
        } catch (error) {
            console.log(error.message);
            response(500, error, 'internal server error \n gagal menghapus banner', res);
        }
    }
}
