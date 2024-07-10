const multer = require('multer');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    // File type validation if needed
    cb(null, true); // Accept the file
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
