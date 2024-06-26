
import dotenv from 'dotenv';
import cors from 'cors';  
import connectMongo from './config/database.js';
import cloudinary from 'cloudinary';
import app from './app.js';
 

// Handling Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);
    console.error('Shutting down the Server due to Unhandled Promise Rejection');
    process.exit(1);
});


// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: './config/.env' });
}

// Connect to MongoDB
connectMongo();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

 
 
 

// Start the Server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    console.error(err.stack);
    console.error('Shutting down the server due to Unhandled Promise Rejection');

    server.close(() => {
        process.exit(1);
    });
});
