const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'assets');
    },
    filename: (req, file, cb) => {
        const digitpertama = Date.now();
        const digitKedua = file.originalname;
        cb(null, digitpertama + digitKedua);
    }
});

const fileFilter = (req, file, next) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        next(null, true);
    } else {
        next(new Error('File harus bertipe png, jpeg, atau jpg'), false);
    }
};

const uploadFile = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
}).single('image');

const uploadMultiple = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
}).array('image', 10);

const upload = {
    single: (req, res, next) => {
        uploadFile(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                res.status(500).send({ message: 'Gagal menambahkan gambar', error });
            } else if (error) {
                res.status(500).send({ message: 'Gagal menambahkan gambar', error });
            } else {
                next();
            }
        });
    },
    many: (req, res, next) => {
        uploadMultiple(req, res, (error) => {
            if (error instanceof multer.MulterError) {
                res.status(500).send({ message: 'Gagal menambahkan gambar', error });
            } else if (error) {
                res.status(500).send({ message: 'Gagal menambahkan gambar', error });
            } else {
                next();
            }
        });
    }
};

module.exports = upload;
