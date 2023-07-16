const mongoose = require("mongoose");
const eventModel = require("../models/event");
const response = require("../respons/response_valid")

module.exports = {
    get:async (req, res) => {
        try{
            const content = await eventModel.find();
            response(200,content,'menampilkan semua content',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan event',res)
        }
    },
    post: async (req, res) => {
        const {title,image,description} = req.body;
        const newUser = new userModel({
            title,
            image,
            description
        })
        try{
            await newUser.save();
            response(201,newUser,'event berhasil di daftarkan',res)
        }catch(err){
            response(500,err,'internal server error',res)
        }
    },
    put: async (req, res) => {
        const updated = req.body
        const id = req.params._id
        try{
            const updateEvent = await eventModel.findByIdAndUpdate(id,updated,{new:true})
            response(200,updateEvent,'Event berhasil di ubah',res)
        }catch(err){
            response(500,err,'internal server error \n gagal mengubah Event',res)
        }
    },
    delete: async (req, res) => {
        const id = req.params._id
        try{
            const deleteEvent = await eventModel.findByIdAndDelete(id)
            response(200,deleteEvent,'Event berhasil di hapus',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menghapus Event',res)
        }
    }
}