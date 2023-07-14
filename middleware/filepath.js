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
