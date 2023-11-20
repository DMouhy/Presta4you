const express = require('express');
const router = express.Router();
const admin_Collection = require('../models/admin_Collection');

//Register
router.post('/register', (req, res) => {
    const { actual_email, new_email, re_email, actual_password, new_password, re_password } = req.body;

    if(!actual_email || !new_email || !re_email || !actual_password || !new_password|| !re_password) {
        console.log(actual_email, new_email, re_email, actual_password, new_password, re_password)
        return res.status(422).json({error: 'Veuillez saisir tous les champs'})
    }

    admin_Collection.findOne({ email: actual_email })
    .then(adminFound => {
        if(!adminFound) res.json({error: "L'email actuel est incorrecte"})
        else{
            if(re_email !== new_email) return res.status(422).json({error: "re_email ne correspond pas"})
            if(re_password !== new_password) return res.status(422).json({error: "re_password ne correspond pas"})
            if(adminFound.password !== actual_password) res.json({error: "Le password actuel est incorrecte"})
            
            admin_Collection.findOneAndUpdate({ email: adminFound.email }, {
                $set: { email: new_email, password: new_password }
            }, { new: true })
            .then(admin => res.json({ message: 'admin modifié', admin }) )
            .catch(err => res.status(422).json({ error: 'No admin' }) )
        }
    })
} )

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(422).json({error: 'please enter all Fields'})

    admin_Collection.findOne({ email: email })
    .then(adminFound => {
        if(!adminFound) return res.status(422).json({error: "Email ou Password non valide"})
        if(adminFound.password !== password) return res.status(422).json({error: "Email ou Password non valide"})

        else return res.json({ message: 'successful', valid: true })
    })

} )

module.exports = router;