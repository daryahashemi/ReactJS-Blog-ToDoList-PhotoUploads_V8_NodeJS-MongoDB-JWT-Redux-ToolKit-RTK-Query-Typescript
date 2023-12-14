import express from 'express'
import mongoose from'mongoose'
import cookieParser from 'cookie-parser'
import allRoutes from './routes/allRoutes.js'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
import fs from 'fs'
import { v4 as uuid } from 'uuid'
import fileUpload from'express-fileupload'
import path from 'path'
import Image from './models/image.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

// middleware & static files
app.use(express.static('public'));
app.use(express.static('uploads'));

// middlewares
app.use(express.json()) // it allows us to parse raw json
app.use(express.urlencoded({ extended: true })) // it allows us to send formdata as well
app.use(cookieParser())

const PORT = process.env.PORT
const dbURI = process.env.DB_URI
mongoose.set('strictQuery', true)

mongoose.connect(dbURI)
.then(() => {
    console.log('connected to db')
    app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}...`)})
})
.catch(err => {
    console.log(err)
    process.exit(1)
})

// routes
app.post('/api/albums/uploadfiles/:id', fileUpload({ createParentPath: true }), (req, res) => {
    const files = req.files
    console.log(files)
    
    const id = req.params.id;
    const newfiles = [];

    Object.keys(files).forEach(key => {
        const ext = path.extname(files[key].name); 
        const idimage = uuid();
        const filePath = `./frontend/public/uploads/images-${id}/${idimage}${ext}`;

        console.log(filePath, key)
        newfiles.push(`images-${id}/${idimage}${ext}`)

        files[key].mv(filePath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    })
    console.log(newfiles)
  
    Image.findByIdAndUpdate(id, { $push: { filePath: newfiles }})
    .then( result => { 
       res.json({ redirect: `/album/${id}` });
    })    
})

// app.get('*', checkUser)
app.use('/api', allRoutes)

app.use(notFound);
app.use(errorHandler);