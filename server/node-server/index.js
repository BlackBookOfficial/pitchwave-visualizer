
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Endpoint to handle file uploads
app.post('/upload', upload.single('file'), async (req, res) => {  // Changed from 'audio' to 'file'
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new FormData instance
    const formData = new FormData();
    
    // Add the file to the FormData using a readable stream
    formData.append('file', fs.createReadStream(req.file.path), {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });
    
    const response = await axios.post('http://localhost:5000/convert', formData, {
      headers: {
        ...formData.getHeaders()
      },
    });

    // Clean up: delete the temporary file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting temporary file:', err);
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
});
