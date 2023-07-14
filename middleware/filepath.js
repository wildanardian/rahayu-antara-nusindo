const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'../assets/achivment' );
    },
    filename: (req, file, cb) => {
        const digitPertama = Math.round(Math.random() * 10);
        const digitKedua = file.originalname.split('.')[0].length;
        const digitKetiga = Date.now();
        cb(null, digitPertama +'-'+ digitKedua +'-'+ digitKetiga)
    }
});

const upload = multer({
    storage: storage,
    SeleksiFile: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
            cb(null, true)
        }else{
            cb(new Error('File harus bertipe png, jpeg, atau jpg'), false)
        }
    }
});

module.exports = upload;
