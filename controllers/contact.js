const mongoose = require("mongoose");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../respons/response_valid")

module.exports = {
    get:async (req, res) => {
        try{
            const content = await contentModel.find();
            response(200,content,'menampilkan semua content',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan contact',res)
        }
    },
    post:async (req, res) => {
        const {whasapp, facebook, instagram, youtube, twitter, email} = req.body;

        // user bebas mengisi apa saja yang di butuhkan 
        // nanti ada pengondisian apakah data kosong atau nga
        //jika kosong ng aakan di tampilkan di front end
        //jika tidak kosong logic di front end menentukan
        //jika tidak kosong panggil icon jika kosong icon tidak akan di tampilkan
        const newContact = new contactModel({
            whasapp,
            facebook,
            instagram,
            youtube,
            twitter,
            email,
        });
        try{
            await newContact.save();
            response(201,newContact,'contact berhasil di tambahkan',res)
        } catch(err){
            response(500,err,'internal server error \n gagal menambahkan contact',res)

        }
    },
    put: async (req, res) => {

    },
    delete: async (req, res) => {

    }
}
