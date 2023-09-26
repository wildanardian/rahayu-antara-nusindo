const express = require('express');
const router = express.Router();
const Contact = require('../models/contactUs'); // Impor model Contact
const nodemailer = require('nodemailer');

// Rute untuk menyimpan pesan kontak

module.exports = {
    send : async (req, res) => {
        try {
            const { firstName, lastName, email, subject, message } = req.body;
        
            // Konfigurasi transporter Nodemailer
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                user: 'catalistteamproject@gmail.com', // Ganti dengan alamat email Anda
                pass: 'catalist.654321', // Ganti dengan kata sandi email Anda
                },
            });
    
            const mailOptions = {
                from: 'catalistteamproject@gmail.com', // Ganti dengan alamat email Anda
                to: 'george123hanip@gmail.com', // Ganti dengan alamat email tujuan catalistteamproject@gmail.com
                subject: subject,
                text: `
                Name: ${firstName} ${lastName}
                Email: ${email}
                Message: ${message}
                `,
            };
    
            // Kirim email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                console.error(error);
                res.status(500).json({ message: 'Error sending email' });
                } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'Email sent successfully' });
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error sending email' });
        }
  },
}
  
