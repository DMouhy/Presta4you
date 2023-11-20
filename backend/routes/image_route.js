const express = require('express');
const router = express.Router();
const image_Collection = require('../models/image_Collection');

// file upload
const { upload_images } = require('../middlewares/FileStorage');
const fs = require('fs');

const { BaseUrl } = require('../keys');

router.get('/get_all_services_images', (req, res) => {
  image_Collection.find({ folder: 'services' })
  .then(async (images) => {

      if(images) {
        res.json(images)
      }
      else res.json('no services images available')
  })
  .catch(err => res.json(err))
})

router.get('/get_all_images', (req, res) => {
    image_Collection.find()
    .then(images => {
        if(images) res.json(images);
        else res.json('no images available')
    })
    .catch(err => res.json(err))
})

router.post('/get_image', (req, res) => {
    const { whereUsed } = req.body;
    
    image_Collection.findOne({ whereUsed })
    .then(image => {
        res.json(image);
    })
    .catch(err => res.json('error in get_image'));
})

router.post('/add_image', upload_images.single('image'), (req, res) => {
    let { alt, whereUsed, folder, caption } = req.body;
  
    if (!whereUsed || !folder) {
      return res.status(400).json({ error: "Ajouter ou l'image est utiliser et le fichier" });
    }
    if (whereUsed === 'none' || folder === 'none') {
      return res.status(400).json({ error: "Ajouter ou l'image est utiliser et le fichier (none)" });
    }
  
    let file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Add image!' });
    }

    let fileName = whereUsed;
    let fileType = file.mimetype.split('/')[1];
    let fileNameWithExtension = `${fileName}.${fileType}`;
  
    if (!alt) alt = file.originalname.split('.')[0];;

    fs.rename(`./uploads/images/${file.filename}`, `./uploads/images/${fileNameWithExtension}`, () => {
      image_Collection.findOne({ name: fileName })
        .then(image => {
          if (image) {
            return res.json({ message: 'Image already exists with this name: '+image.name, image });
          } else {
            let oldFile;
            image_Collection.findOne({ whereUsed })
              .then(imageFound => { if (imageFound) oldFile = `${imageFound.name}.${imageFound.imageType}`; })
  
            image_Collection.findOneAndUpdate({ whereUsed }, {
              $set: {
                name: fileName,
                imageURL: `${BaseUrl}/static/images/${fileNameWithExtension}`,
                imageType: fileType,
                alt,
                used: true,
                whereUsed,
                folder,
                caption
              }
            }, { new: true })
              .then(updated_image => {
                if (!updated_image) {
                  console.log('no file')
                  const newImage = new image_Collection({
                    name: whereUsed,
                    imageURL: `${BaseUrl}/static/images/${fileNameWithExtension}`,
                    imageType: fileType,
                    alt,
                    used: true,
                    whereUsed,
                    folder,
                    caption
                  });
                  newImage.save()
                    .then((saved_image) => res.json({
                      message: `${saved_image.name}, is saved`,
                      saved_image
                    }))
                    .catch(err => res.status(500).json({ error: 'Error in: image_route:add_logo:newImage.save():' + err }));
                } else {
                  let filePath = 'uploads/images/' + `${oldFile}`;
                  fs.unlinkSync(filePath);
  
                  res.json({ message: `${whereUsed} Successfully Changed` })
                }
              })
              .catch(err => res.status(500).json({ error: 'Error in findOneAndUpdate: ' + err }))
          }
        })
        .catch(err => res.status(500).json({ error: 'Error in findOne: ' + err }));
    })
  });

router.post('/delete_an_image', (req, res) => { 
    const { id } = req.body;
    if(!id) res.json('give id');

    image_Collection.findById(id)
    .select('_id name imageType')
    .then(async (image) => {
        if(!image) res.json({ message:  'no image exists with this name' })
        
        // delete the image from folder
        let filePath = 'uploads/images/'+image.name +`.${image.imageType}`;
        fs.unlinkSync(filePath);

        // delete the image from dataBase
        await image_Collection.findByIdAndDelete(image._id)
    })
    .then(() => res.json('image removed') )
    .catch(err => res.json('delete_an_image_problem? ' +err))
})

router.get('/delete_all_images', (req, res) => {

  image_Collection.find()
  .select('_id name imageType')
  .then(images => {
      if(!images) res.json({ message:  'no image exists with this name' })

      images.forEach(async (image) => {
        // delete the image from folder
        let filePath = 'uploads/images/'+image.name +`.${image.imageType}`;
        fs.unlinkSync(filePath);

        // delete the image from dataBase
        await image_Collection.findByIdAndDelete(image._id)
      })
  })
  .then(() => res.json('images removed') )
  .catch(err => res.json('delete_all_image_problem? ' +err))
})

module.exports = router;