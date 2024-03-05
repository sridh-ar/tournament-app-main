const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

// Set up Multer for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/'); // Define the destination folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Use the current timestamp as a filename
  },
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('File uploaded!');
});

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
