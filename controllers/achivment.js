const moongoose = require('mongoose')
const achivmentModel = require('../models/achivment')
const response = require('../respons/response_valid');
const upload = require('../middleware/filepath');


module.exports = {
    get: async (req, res) => {
        try{
            const content = await achivmentModel.find();
            response(200,content,'menampilkan semua content',res)
        }catch(err){
            response(500,err,'internal server error \n gagal menampilkan achivment',res)
        }
    },
    post : async (req, res) => {
        upload.single('image')(req, res, async (rusak) => {
            if (rusak instanceof multer.MulterError) {
                response(500,err,'internal server error \n gagal menambahkan gambar achivment',res)
            }else if (rusak){
                response(500,err,'internal server error \n gagal menambahkan gambar achivment',res)
            }else{
            // abis jumatan ngerjain ini
            }
        })
    },
}
