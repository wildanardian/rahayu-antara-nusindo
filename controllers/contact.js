const mongoose = require("mongoose");
const contactModel = require("../models/contact");
const response = require("../respons/response_valid")

module.exports = {
    get:async (req, res) => {
        try{
            const content = await contactModel.find();
            response(200,content,'menampilkan semua content',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan contact',res)
        }
    },
    post:async (req, res) => {
        const {whasapp, facebook, instagram, youtube, twitter, email, map} = req.body;
        // user bebas mengisi apa saja yang di butuhkan 
        // pengondisian apakah data kosong atau nga
        //jika kosong nga akan di tampilkan di front end
        //jika tidak kosong panggil icon jika kosong icon tidak akan di tampilkan
        const newContact = new contactModel({
            whasapp,
            facebook,
            instagram,
            youtube,
            twitter,
            email,
            map
        });
        try{
            await newContact.save();
            response(201,newContact,'contact berhasil di tambahkan',res)
        } catch(err){
            response(500,err,'internal server error \n gagal menambahkan contact',res)

        }
    },
    put: async (req, res) => {
        const updated = req.body
        const id = req.params._id
        try{
            const updateContact = await contactModel.findByIdAndUpdate(id,updated,{new:true})
            response(200,updateContact,'contact berhasil di ubah',res)
        }catch(err){
            response(500,err,'internal server error \n gagal mengubah contact',res)
        }
    },
    delete: async (req, res) => {
        const id = req.params._id
        try{
            const deleteContact = await contactModel.findByIdAndDelete(id)
            response(200,deleteContact,'contact berhasil di hapus',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menghapus contact',res)
        }
    }
}
