const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'certificate', maxCount: 1 }
]);

module.exports = upload;
