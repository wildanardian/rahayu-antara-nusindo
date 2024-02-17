const mitraSchema = require('../models/mitra');
const response = require('../respons/response_valid');
const multer = require('multer');
const upload = require('../middleware/filepath');

module.exports = {
    get:async (req,res) =>{
        try{
            const data = await mitraSchema.find();
            response(200,data,'menampilkan seluruh mitra ', res)

        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menampilakn mitra ', res)
        }
    },
    post:async(req,res) =>{
        upload.single(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                console.log(error.message);
                response(500, error, 'internal server error \n gagal menambahkan gambar mitra', res);
            } else if (error) {
                console.log(error.message);
                response(500, error, 'internal server error \n gagal menambahkan gambar mitra', res);
            } else {
                try {
                    const { title } = req.body;
                    if (!req.file) {
                        response(400, null, 'Berkas gambar (image) diperlukan', res);
                        return;
                    }
            
                    const image = req.file.filename;
                    const newData = new mitraSchema({
                        title,
                        image
                    });
                    await newData.save();
                    response(201, newData, 'mitra berhasil di tambahkan', res);
                } catch (error) {
                    console.log(error.message);
                    response(500, error, 'internal server error \n gagal menambahkan mitra', res);
                }
            }
        });
    },


    put: async (req, res) => {
        const id = req.params._id;
        upload.single(req, res, async (error) => {
            if (error instanceof multer.MulterError) {
                response(500, error, 'internal server error \n gagal menambahkan gambar mitra', res);
            } else if (error) {
                response(500, error, 'internal server error \n gagal menambahkan gambar mitra', res);
            } else {
                try {
                    const { title } = req.body;
                    let update = { title };

                    if (req.file) {
                        update = {
                            title,
                            image: req.file.filename 
                        };
                    }

                    const updateData = await mitraSchema.findByIdAndUpdate(id,update,{ new: true });
                    response(200, updateData, 'mitra berhasil diperbarui', res);
                } catch (error) {
                    console.log('error : \n ',error.message);
                    response(500, error, 'internal server error \n gagal memperbarui mitra', res);
                }
            }
        });
    },
    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteData = await mitraSchema.findByIdAndDelete(id);
            if (!deleteData) {

                response(404, null, 'data tidak ditemukan', res);
                return;
            }
            response(200, deleteData, 'data berhasil dihapus', res);
        } catch (err) {
            console.log(err.message);
            response(500, err, 'Internal server error \n Gagal menghapus data', res);
        }
    }
}
