const kategoriSchema = require('../models/kategori');
const response = require('../respons/response_valid');
const { getLatest } = require('./ofp');


module.exports = {
    get:async (req,res) =>{
        try{

            const data = await kategoriSchema.find().populate('ofp');
            response(200,data,'menampilkan seluruh kategori ', res);

        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menampilakn kategori ', res)
        }
    },
    post:async(req,res) =>{
        try{
            const {nama} = req.body;
            const newData = new kategoriSchema({
                nama
            });
            await newData.save();
            response(201,newData,'kategori berhasil di tambahkan', res);
        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menambahkan kategori', res)
        }
    },

    getLatest: async (req, res) => {
        try{
            const lastUpdate = await kategoriSchema.findOne().sort({updatedAt: -1});
            const lastAdd = await kategoriSchema.findOne().sort({createdAt: -1});
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
            response(200,result,'menampilkan kategori', res)
        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menampilkan kategori', res)
        }
    },
    put:async(req,res) =>{
        try{
            const id = req.params._id;
            const {nama} = req.body;
            let update = {nama};
            const data = await kategoriSchema.findByIdAndUpdate(id,update,{new:true});
            response(200,data,'kategori berhasil di ubah', res)
        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal mengubah kategori', res);
        }
    },
    delete:async(req,res) =>{
        try{
            const id = req.params._id;
            const data = await kategoriSchema.findByIdAndRemove(id);
            response(200,data,'kategori berhasil di hapus', res)
        }catch(error){
            console.log(error);
            response(500,error,'internal server error \n gagal menghapus kategori', res)
        }
    }
};
