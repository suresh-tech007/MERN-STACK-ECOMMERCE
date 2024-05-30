import express from "express"
import {errormidleware} from "./middleware/error.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload"
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import path from "path"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
//  Config ==>
    if (process.env.NODE_ENV !== 'PRODUCTION') {
        dotenv.config({ path: 'backed/config/.env' });
    }
    


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
 
// app.use(express.urlencoded({extended:true}))
app.use(fileUpload())


// Route Import 

import product from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js"
import order from "./routes/orderRoute.js"
import payment from "./routes/paymentRoute.js"


app.use("/api/v1",product)
app.use("/api/v1",userRoute)
app.use("/api/v1",order)
app.use("/api/v1",payment)
app.use(express.static(path.join(__dirname,"../fronted/build")))
app.get("*",(req,res)=>{res.sendFile(path.resolve(__dirname,"../fronted/build/index.html"))})
app.use(errormidleware)

export default app; 