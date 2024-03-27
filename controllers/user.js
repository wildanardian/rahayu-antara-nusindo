const mongoose = require("mongoose");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator'); // npm install express-validator
const jwt = require("jsonwebtoken");
require("dotenv").config();
const response = require("../respons/response_valid");
const { use } = require("../routers/user");

module.exports = {
    login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { username, password } = req.body;
            const secret_key = process.env.secret_key;
    
            const user = await userModel.findOne({ username }).select('-token');
            if (!user) {
                return res.status(400).json({ message: 'User tidak ditemukan' });
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: 'Password salah' });
            }
            // username
            const token = jwt.sign({ id: user._id, username: user.username},secret_key, { expiresIn: '1d' }) 
            user.token = token;
            await user.save();
            return (res.status(200).json({ token, message: 'Login berhasil' }));
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
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
    // login: async (req, res) => {
    //     try{
    //         const {username, password} = req.body;
    //         const secret_key = process.env.secret_key;

    //         const user = await userModel.findOne({username});
    //         // mengecek apakah username valid
    //         if(!user){
    //             return response(400,user,'user tidak ditemukan',res)
    //         }
    //         // mengecek apakah password valid
    //         const validPassword = await bcrypt.compare(password, user.password);
    //         if(!validPassword){
    //             return response(400,validPassword,'password salah',res)
    //         }
    //         // membuat token
    //         const token = jwt.sign({id:user._id,jabatan:user.jabatan},secret_key,{expiresIn:'1d'});
    //         response(200,{token},'login berhasil',res)
    //     }catch(err){
    //         console.log(err.message);
    //         response(500,err,'internal server error',res)
    //     }
    // },
    logout: async (req, res) => {
        try {
            const token = req.params.token;
            const user = await userModel.findOne({ token });      
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: 'User tidak ditemukan' });
            }
            user.token = null;
            user.save();    
            return res.status(200).json({ message: 'Logout berhasil' });        
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getAllUser: async (req, res) => {
        try{
            const user = await userModel.find();
            response(200,user,'menampilkan semua user',res)
        }catch(err){
            console.log(err.message);
            response(500,err,'internal server error',res)
        }
    },
    post: async (req, res) => {
        const { username, password, email} = req.body;
        const passwordEncripted = await bcrypt.hash(password,15);
        const newUser = new userModel({
            username,
            password:passwordEncripted,
            email,
        })
        try{
            await newUser.save();
            return response(201,newUser,'user berhasil di daftarkan',res)
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
