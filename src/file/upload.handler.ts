import {Request, Response, NextFunction} from 'express'
import fs from 'fs';
import path from 'path';


function ensureDirectorExists(directory: string) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
    }
}

export async function handleAfterFileUpload(req: Request, res: Response, next: NextFunction) {

    console.log(req.headers['file-name']);
    const uploadsdir = "./data/uploads/audio"
    const fileName = 'uploaded_file_' + Date.now(); // Generate a unique file name
    const filePath = path.join(uploadsdir, fileName); // Destination for the file
    
    ensureDirectorExists(uploadsdir);
  
    // Create a write stream to the desired file path
    const writeStream = fs.createWriteStream(filePath);
  
    // Pipe the incoming request (stream) to the file
    req.pipe(writeStream);
  
    // Listen for the 'finish' event to confirm file saving is complete
    writeStream.on('finish', () => {
      res.status(200).json({ message: 'File uploaded successfully!', filePath });
    });
  
    // Handle any errors during file writing
    writeStream.on('error', (err) => {
      res.status(500).json({ message: 'Error saving file', error: err.message });
    });
  
    // Optional: Handle errors from the incoming request stream
    req.on('error', (err) => {
      res.status(500).json({ message: 'Error reading file', error: err.message });
    });
}