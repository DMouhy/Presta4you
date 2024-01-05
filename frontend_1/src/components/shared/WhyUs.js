import React from 'react';
import './WhyUs.css';
import { GiPriceTag, GiEcology } from 'react-icons/gi';
import { AiFillSafetyCertificate } from 'react-icons/ai';
import { RiPassValidFill } from 'react-icons/ri';

function WhyUs() {
  return (
    <div className='whyus_container'>
        <p>Pourquoi <span>Presta4You</span> ?</p>

        <p>Que vous ayez besoin de laver votre canapé, de repasser vos chemises ou de faire le ménage, nous sommes là pour Vous. Réservez en ligne à tout moment.</p>

        <div className='cards_container'>
            <div className='card'>
                <GiPriceTag className='icon' />
                <p>Prix juste et raisonable</p>
                <p>Prix juste et connu d'avance pour éviter toute surprise.</p>
            </div>

            <div className='card'>
                <RiPassValidFill className='icon' />
                <p>Experience et savoir-faire</p>
                <p>Experts en nettoyage, efficacité et résultats impeccables.</p>
            </div>

            <div className='card'>
                <AiFillSafetyCertificate className='icon' />
                <p>Garantie de satisfaction</p>
                <p>Votre satisfaction, notre priorité. Un service impeccable.</p>
            </div>

            <div className='card'>
                <GiEcology className='icon' />
                <p>Ecologie et responsabilité</p>
                <p>Nous privilégions l'utilisation des produits éco-responsables.</p>
            </div>
        </div>
    </div>
  )
}

export default WhyUs