const mongoose = require("mongoose");
const mediaReleaseSchema = require("../models/mediaRelease");
const response = require("../respons/response_valid")
const upload = require('../middleware/filepath');
const multer = require('multer');
const fs = require('fs');

module.exports = {
	get:async (req, res) => {
		try{
			const content = await mediaReleaseSchema.find();
			response(200,content,'menampilkan semua event',res)
		}catch(err){
			response(500,err,'internal server error \n gagal menampilkan event',res)
		}
	},
    getOne: async (req, res) => {
		const id = req.params._id;
		try {
			const content = await mediaReleaseSchema.findById(id);
		if (!content) {
			response(404, null, 'Event tidak ditemukan', res);
			return;
		}
			response(200, content, 'menampilkan event', res);
		} catch (err) {
			console.log(err.message);
			response(500, err, 'internal server error \n gagal menampilkan event', res);
		}
    },

  
    post: async (req, res) => {
		upload.many(req, res, async (error) => {
		if (error) {
			console.error(error.message);
			res.status(500).send({ message: 'Internal server error', error });
			return;
		}

		try {
			const { title, content, status } = req.body;
			const images = req.files.map((file) => file.filename);
			const newMediaRelease = new mediaReleaseSchema({
				title,
				content,
				status,
				image: images,
			});
			await newMediaRelease.save();
			res.status(201).send({ message: 'Event berhasil ditambahkan', data: newMediaRelease });
		} catch (error) {
			console.error(error.message);
			res.status(500).send({ message: 'Internal server error', error });
		}
		});
    }, 


    // put: async (req, res) => {
	// 	const id = req.params._id;
	// 	upload.many(req, res, async (error) => {
	// 	if (error) {
	// 		console.error(error.message);
	// 		res.status(500).send({ message: 'Internal server error', error });
	// 		return;
	// 	}	
	// 		const { title, content,status } = req.body;
	// 		const {confrimUpdateImage} = req.body;
	// 		const updateMedia = { 
	// 			title,
	// 			content,
	// 			status 
	// 		};

	// 		let images = [];
	// 		if (confrimUpdateImage === 'true') {
	// 			const media = await mediaReleaseSchema.findById(id);
	// 			media.image.forEach((image) => {
	// 				fs.unlinkSync(`assets/${image}`);
	// 			});
	// 			images = req.files.map((file) => file.filename);
	// 			updateMedia.image = images;
	// 		}
	// 		try{
	// 			const result = await mediaReleaseSchema.findByIdAndUpdate (id, updateMedia , {new: true});
	// 			res.status(200).send({ message: 'Event berhasil diupdate', data: result });
	// 		}catch(err){
	// 			console.log(err.message);
	// 			response(500, err, 'internal server error \n gagal mengupdate event', res);
	// 		}
	// 	});
    // },

	put: async (req, res) => {
		const id = req.params._id;
		upload.many(req, res, async (error) => {
			if (error) {
				console.error(error.message);
				res.status(500).send({ message: 'Internal server error', error });
				return;
			}
	
			try {
				const { title, content, status } = req.body;
				const { confirmUpdateImage } = req.body;
				const updateMedia = {
					title,
					content,
					status
				};
	
				let images = [];
				if (confirmUpdateImage === 'true') {
					const media = await mediaReleaseSchema.findById(id);
					media.image.forEach((image) => {
						fs.unlinkSync(`assets/${image}`);
					});
					images = req.files.map((file) => file.filename);
					updateMedia.image = images;
				}
				const result = await mediaReleaseSchema.findByIdAndUpdate(id, updateMedia, { new: true });
				res.status(200).send({ message: 'Event berhasil diupdate', data: result });
			} catch (err) {
				console.log(err.message);
				response(500, err, 'internal server error \n gagal mengupdate event', res);
			}
		});
	},
	


    delete: async (req, res) => {
        const id = req.params._id;
        try {
            const deleteEvent = await mediaReleaseSchema.findByIdAndDelete(id);
            if (!deleteEvent) {

                response(404, null, 'Event tidak ditemukan', res);
                return;
            }
            response(200, deleteEvent, 'Event berhasil dihapus', res);
        } catch (err) {
            console.log(err.message);
            response(500, err, 'Internal server error \n Gagal menghapus Event', res);
        }
    }
    
    
}
