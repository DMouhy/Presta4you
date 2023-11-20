const express = require('express');
const router = express.Router();
const reservation_Collection = require('../models/reservation_Collection');
const email_Collection = require('../models/email_Collection');

// get reservations
router.post('/get_reservations', (req, res) => {
    const {all, done, not_done} = req.body;

    if(all){
        reservation_Collection.find()
        .sort({ created_at: -1 })
        .then(reservations => {
            if(!reservations) res.json({error: 'no reservations available'})
            else res.json(reservations)
        })
        .catch(err => res.json({ error: 'Error in: product_route:get_reservations:catch() ' +err }) )
    }
    else if(done){
        reservation_Collection.find({ done: true })
        .sort({ created_at: -1 })
        .then(reservations => {
            if(!reservations) res.json({error: 'no done reservations available'})
            else res.json(reservations)
        })
        .catch(err => res.json({ error: 'Error in: product_route:get_reservations:catch() ' +err }) )
    }
    else if(not_done){
        reservation_Collection.find({ done: false })
        .sort({ created_at: -1 })
        .then(reservations => {
            if(!reservations) res.json({error: 'no current reservations available'})
            else res.json(reservations)
        })
        .catch(err => res.json({ error: 'Error in: product_route:get_reservations:catch() ' +err }) )
    }
    else res.json({ error: 'a problem' })
})

// modify done
router.post('/modify_done', (req, res) => {
    const { _id, done } = req.body;

    reservation_Collection.findByIdAndUpdate(_id, {
        $set: { done }
    }, { new: true })
    .then(reservation => res.json({ message: 'done updated' }) )
    .catch(err => res.status(422).json({ error: 'No reservation' }) )

} )

// get emails
router.get('/get_emails', (req, res) => {
    email_Collection.find()
    .sort({ created_at: -1 })
    .then(emails => {
        if(!emails) res.json({error: 'no emails available'})
        else res.json(emails)
    })
    .catch(err => res.json({ error: 'Error in: product_route:get_emails:catch() ' +err }) )
})

// search reservations
router.post('/search_reservations_byNumber', (req, res) => {
    
    const { search_string } = req.body;
    if(!search_string || !(/^\d+$/.test(search_string))) return res.json({ Empty_error: 'there is no number' })

    const search_str_lower = search_string.toLowerCase();

    reservation_Collection.find()
    .then(reservations => {
        let reservationsFound = []

        reservations.map(reservation => {
            const phone = reservation.phone.toLowerCase();

            if(phone.startsWith(search_str_lower)) return reservationsFound.push(reservation);
        })

        if(reservationsFound.length === 0){
            return res.json({error: 'No Result'})
        }
        return res.json({ message: 'success', reservationsFound })
    })
})

// search reservations
router.post('/search_reservations_byservice', (req, res) => {
    
    const { search_string } = req.body;
    if(!search_string) return res.json({ Empty_error: 'there is no message' })

    const search_str_lower = search_string.toLowerCase();

    reservation_Collection.find()
    .then(reservations => {
        let reservationsFound = []

        reservations.map(reservation => {
            const service = reservation.service.toLowerCase();

            if(service.startsWith(search_str_lower)) return reservationsFound.push(reservation);
        })

        if(reservationsFound.length === 0){
            return res.json({error: 'No Result'})
        }
        return res.json({ message: 'success', reservationsFound })
    })
})

// add reservation
router.post('/add_reservation', (req, res) => {
    const { first_name, last_name, email, phone, service, message } = req.body;

    if(!first_name || !last_name || !email || !phone || !service ) return res.status(422).json({error: 'Veuillez saisir tous les champs'})

    const new_reservation = new reservation_Collection({
        first_name,
        last_name,
        email,
        phone,
        service,
        message,
        done: false,
        created_at: new Date().toUTCString()
    })
    new_reservation.save()
    .then(saved_reservation => {
        email_Collection.findOne({ email: saved_reservation.email })
        .then(emailFound => {
            if(!emailFound){
                const new_email = new email_Collection({
                    full_name: `${saved_reservation.last_name} ${saved_reservation.first_name}`,
                    email: saved_reservation.email,
                    created_at: new Date().toUTCString()
                })
                new_email.save()
                .then(() => res.json({message: 'Votre demande est envoyé avec succès'}))
            }
            else res.json({message: 'Votre demande est envoyé avec succès'});
        })
    } )
    .catch(err => console.log('createReservation: ', err))

} )

module.exports = router;