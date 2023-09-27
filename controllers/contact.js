const express = require('express');
const Contact = require('../models/contactUs');
const response = require('../respons/response_valid');

module.exports = {
    get: async function (req, res) {
        try{
            const data = await Contact.find();
            response(200,data,'menampilkan semua event',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan event',res)
        }
    },
    post: async function (req, res) {
        try{
            const { firstName, lastName, email, subject, message } = req.body;
            const newContact = new Contact({
                firstName,
                lastName,
                email,
                subject,
                message
            });
            const data = await newContact.save();
            response(201, data, 'event berhasil di tambahkan', res);

        }catch(error) {
            console.log(error.message);
            response(500, error, 'internal server error \n gagal menambahkan event', res);
        }
    },
    delete: async function (req, res) {
        const id = req.params._id;
        try {
            const content = await Contact.findByIdAndDelete(id);
            if (!content) {
                response(404, null, 'Event tidak ditemukan', res);
                return;
            }
            response(200, content, 'Event berhasil dihapus', res);
        } catch (err) {
            console.log(err.message);
            response(500, err, 'internal server error \n gagal menghapus event', res);
        }
    },
    deleteAll: async function (req, res) {
        try {
            const content = await Contact.deleteMany();
            if (!content) {
                response(404, null, 'Event tidak ditemukan', res);
                return;
            }
            response(200, content, 'Event berhasil dihapus', res);
        } catch (err) {
            console.log(err.message);
            response(500, err, 'internal server error \n gagal menghapus event', res);
        }
    }
}
