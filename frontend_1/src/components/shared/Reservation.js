import React, { useState, forwardRef, useEffect } from 'react';
import './Reservation.css';
import BaseUrl from '../../BaseUrl';

const Reservation = forwardRef((props, ref) => {

    const [firstName, set_firstName] = useState('');
    const [lastName, set_lastName] = useState('');
    const [email, set_email] = useState('');
    const [phone, set_phone] = useState('');
    const [service, set_service] = useState('');
    const [message, set_message] = useState('');

    const [popMessage, set_popMessage] = useState({
        message: '',
        error: ''
    });

    useEffect(() => {
        set_service('Nettoyage à domicile')
    }, [])

    function add_reservation(e){
        e.preventDefault();
        
        fetch(`${BaseUrl}/api/add_reservation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                first_name: firstName,
                last_name: lastName,
                email,
                phone,
                service,
                message
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.message){
                set_popMessage({ message: res.message, error: '' })
                setTimeout(() => set_popMessage({ message: '', error: '' }), 5000)
                set_firstName('')
                set_lastName('')
                set_email('')
                set_phone('')
                set_service('')
                set_message('')

                let whatsappUrl = "https://wa.me/+212689617119?text="
                +"Nom du client: "+firstName+" "+lastName+"%0a"
                +"Email: "+email+"%0a"
                +"N° téléphone: "+phone+"%0a"
                +"Service: "+service+"%0a"
                +"Message: "+message;
                window.open(whatsappUrl,"_blank").focus();
            }
            if(res.error){
                set_popMessage({ message: '', error: res.error })
                setTimeout(() => set_popMessage({ message: '', error: '' }), 5000)
            }
        })
        .catch(res => console.log(res))
    }

  return (
    <div ref={ref} className='reservation_container'>

        <div className='text_container'>
            <p>Réservez votre prestation dès <span>MAINTENANT</span> !</p>
            <p>Merci de nous laisser vos infos pour que notre équipe puisse vous recontacter dès que possible</p>
        </div>

        <form onSubmit={(e) => add_reservation(e)}>

            { popMessage.message !== '' && <div className='messageTRUE'>{popMessage.message}</div> }

            { popMessage.error !== '' && <div className='messageFALSE'>{popMessage.error}</div> }

            <label>Prénom:</label>
            <input onChange={(e) => set_firstName(e.target.value)} type="text" name='Prénom' placeholder='Prénom...' value={firstName} />

            <label>Nom:</label>
            <input onChange={(e) => set_lastName(e.target.value)} type="text" name='Nom' placeholder='Nom...' value={lastName} />

            <label>Email:</label>
            <input onChange={(e) => set_email(e.target.value)} type="email" name='email' placeholder='email...' value={email} />

            <label>Téléphone (Whatsapp):</label>
            <input onChange={(e) => set_phone(e.target.value)} type="text" name='phone' placeholder='phone...' value={phone} />

            <label htmlFor='services'>Type de service:</label>
            <select onChange={(e) => set_service(e.target.value)} id='services'>
                <option value='Nettoyage à domicile'>Nettoyage à domicile</option>
                <option value='Nettoyage particulière, industriel et jardinage'>Nettoyage particulière, industriel et jardinage</option>
                <option value='Sécurité du travail'>Sécurité du travail</option>
                <option value='Mise à disposition des chaufeurs et nures'>Mise à disposition des chaufeurs et nures</option>
                <option value='Des actions de courtage'>Des actions de courtage</option>
                <option value='Evenementiel et sonorisation'>Evenementiel et sonorisation</option>
                <option value='Transport du Personnel et scolaire'>Transport du Personnel et scolaire</option>
                <option value='Travaux de fin de chantier'>Travaux de fin de chantier</option>
            </select>

            <label>Votre message:</label>
            <textarea onChange={(e) => set_message(e.target.value)} type="text" name='message' placeholder='message...' value={message} />

            <button type='submit'>Réserver</button>
        </form>

    </div>
  )
})

export default Reservation