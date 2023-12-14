import Image from '../models/image.js'
import fs from 'fs'

const allalbum_index = (req, res) => { 
    Image.find().sort({ createdAt: -1 })
    .then(result => {
        res.status(200).json( result )
    })
    .catch(err => {
        console.log(err);
    });
}

const album_details =  (req,res) => {
    const id = req.params.id;
    Image.findById(id)
    .then((result) => {
        res.status(200).json( result )
    })
}

const album_create = (req, res) => {  
    const image = new Image({albumName: req.body.albumName, filePath:[]});
    
    image.save()
    .then(result => {
        const dir = `./frontend/public/uploads/images-${result.id}`
        if (!fs.existsSync(dir)){
            fs.mkdir(dir, (err) => {
                if (err) throw err;
            });
        }

        res.json({ redirect: `/album` });
        console.log('An new album is created')
    })
    .catch(err => {
        console.log(err);
    });
}

const delete_photos = (req, res) => { 
    const id = req.params.id
    console.log(req.body)
    const imagestodelete = req.body;
    let i;
    const arraylength = req.body.length;

    for (i = 0; i < arraylength ; i++) {
    if(fs.existsSync(`./frontend/public/uploads/${req.body[i]}`)) {
            fs.unlink(`./frontend/public/uploads/${req.body[i]}`, (err) => {
                if(err){
                console.log(err);
                }
                console.log('photo/photos are deleted');
            });
        }
    }
    
    Image.findByIdAndUpdate(`${req.params.id}`, { $pullAll: { filePath: imagestodelete }})
    .then( result => {    
        console.log(result)
    })
    
    res.json({ redirect: `/album/${req.params.id}` }); 
}

const delete_album = (req, res) => {
    const id = req.params.id;

    if(fs.existsSync(`./frontend/public/uploads/images-${id}`)) {
        console.log(`./frontend/public/uploads/images-${id}`)
        fs.rm(`./frontend/public/uploads/images-${id}`, { recursive: true },  (err) => {
            if(err){
            console.log(err);
            }
            console.log(`The album ${id} is deleted`);
        });
    }
  
    Image.findByIdAndDelete(id)
    .then(result => {
        res.json({ redirect: '/album' });
    })
    .catch(err => {
        console.log(err);
    });
}

export default {
  allalbum_index, 
  album_details, 
  album_create,
  delete_photos,
  delete_album,
}