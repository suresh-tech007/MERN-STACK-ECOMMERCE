// import mongoose from "mongoose";

// const  connectMongo = ()=>{
//     mongoose.connect(process.env.DB_URI ).then((data)=>{
//         console.log(`mongoose is connected with server ${data.connection.host}`)
//     }) 
// }

// export default connectMongo;

import mongoose from 'mongoose';

const connectMongo = async () => {
    try {
        const dbUri = process.env.DB_URI;
        
        if (!dbUri) {
            throw new Error('DB_URI is not defined in the environment variables');
        }

        const connection = await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB is connected with server: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

export default connectMongo;