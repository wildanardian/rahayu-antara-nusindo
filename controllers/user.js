const mongoose = require("mongoose");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const response = require("../respons/response_valid")

module.exports = {
    register:async (req, res) => {
        try{
            // check if user exist
            const {name, username, password, email} = req.body;
            const userCek = await userModel.findOne({
                $or: [{username},{email}],
            });
            if(userCek){
                return response(400, userCek,'user sudah terdaftar',res)
            }
            // password
            const passwordEncripted = await bcrypt.hash(password,15);

            const newUser = new userModel({
                name,
                username,
                password:passwordEncripted,
                email,
            })
            await newUser.save();
            response(201,newUser,'user berhasil di daftarkan',res)
        }catch(err){
            console.log(err.message);
            response(500,err,'internal server error',res)
        }
    },
    login: async (req, res) => {
        try{
            const {username, password} = req.body;
            const secret_key = process.env.secret_key;

            const user = await userModel.findOne({username});
            // mengecek apakah username valid
            if(!user){
                return response(400,user,'user tidak ditemukan',res)
            }
            // mengecek apakah password valid
            const validPassword = await bcrypt.compare(password, user.password);
            if(!validPassword){
                return response(400,validPassword,'password salah',res)
            }
            // membuat token
            const token = jwt.sign({id:user._id,jabatan:user.jabatan},secret_key,{expiresIn:'1d'});
            response(200,{token},'login berhasil',res)
        }catch(err){
            console.log(err.message);
            response(500,err,'internal server error',res)
        }
    },
    getAllUser: async (req, res) => {
        try{
            const user = await userModel.find();
            response(200,user,'menampilkan semua user',res)
        }catch(err){
            response(500,err,'internal server error',res)
        }
    },
    post: async (req, res) => {
        const passwordEncripted = await bcrypt.hash(password,15);
        const {name, username, password, email, jabatan} = req.body;
        const newUser = new userModel({
            name,
            username,
            password:passwordEncripted,
            email,
            jabatan,
        })
        try{
            await newUser.save();
            response(201,newUser,'user berhasil di daftarkan',res)
        }catch(err){
            response(500,err,'internal server error',res)
        }
    },
    put: async (req, res) => {
        userId = req.params.id;
        const updatedData = req.body;
        try{
            const result = await userModel.findByIdAndUpdate(userId,updatedData,{new:true});
            response(200,result,'user berhasil di update',res)
        }catch(err){
            response(500,err,'internal server error',res)
        }
    },
    delete: async(req, res) => {
        try {
            const id = req.params.id;
            const result = await userModel.findByIdAndRemove(id);
            response(200, result, 'user berhasil dihapus', res);
        }catch(error){
            response(500, error, 'Internal Server Error \n Gagal menghapus user',res)
        }
    }
}
