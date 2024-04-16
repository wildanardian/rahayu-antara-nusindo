const mongoose = require("mongoose");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const { validationResult } = require('express-validator'); // npm install express-validator
const jwt = require("jsonwebtoken");
require("dotenv").config();
const response = require("../respons/response_valid");
const dataUser = require("../utils/userdata");

module.exports = {
    register: async (req, res) => {
        try {
            const { username, password, email } = req.body;      
            if (!dataUser || !dataUser.email.includes(email)) {
                return res.status(400).json({ message: 'Email tidak terdaftar' });
            }
    
            const userExist = await userModel.findOne({ email });
            if (userExist) {
                return res.status(400).json({ message: 'Email sudah terdaftar' });
            }
    
            const passwordEncrypted = await bcrypt.hash(password, 15);
            const newUser = new userModel({
                username,
                password: passwordEncrypted,
                email,
            });
            await newUser.save();
            return res.status(201).json({ message: 'User berhasil didaftarkan', data: newUser });
        } catch (err) {
            if (err.code === 11000) {
                return res.status(400).json({ message: 'Email sudah terdaftar' });
            }
            console.error(err.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    
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
