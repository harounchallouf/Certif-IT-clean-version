const express = require('express')
const router = express.Router()
const uploader = require('../configs/cloudinary.config')
const { isLoggedIn } = require('../middleware/custom-middleware')


router.post('/upload', isLoggedIn, uploader.single('imageUrl'), (req, res, next) => {
    if (!req.file) {
      res.status(500).json({ message: 'Erreur de chargement du fichier' })
    }
    else{
     res.json({ imageUrl: req.file.path })}
})


module.exports = router