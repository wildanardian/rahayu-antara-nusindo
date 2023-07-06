const bcrypt = require('bcrypt')
const db = require('../db')
const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const response = require('../respons/response_valid')

module.exports = {
    adminandsuperadmin: function (req, res, next) {
        const authHeader = req.headers.authorization;
        const token = process.env.secret_key;

        if (!authHeader) {
            response(401,null, 'anda tidak memiliki akses', res)
        }

        const tokenHeader = authHeader.split(' ')[1];

        jwt.verify(tokenHeader, token, (err, user) => {
            if (err) {
                response(403,null, 'token anda tidak valid', res)
            }
            req.user = user;
            if (req.user.jabatan === 'kadiv' || req.user.jabatan === 'manager') {
                response(200,{Permission:"token anda valid"}, 'anda memiliki akses', res)
                next();
            }
        });
    },
    superadmin: function (req, res, next) {
        const authHeader = req.headers.authorization;
        const token = process.env.secret_key;

        if (!authHeader) {
            response(401,null, 'anda tidak memiliki akses', res)
        }

        const tokenHeader = authHeader.split(' ')[1];

        jwt.verify(tokenHeader, token, (err, user) => {
            if (err) {
                response(403,null, 'token anda tidak valid', res)
            }
            req.user = user;
            if (req.user.jabatan === 'manager') {
                response(200,{Permission:"token anda valid"}, 'anda memiliki akses', res)
                next();
            }
        });
    },
    
}
