import React, { useState, useEffect } from 'react';
import './Steps.css';
import BaseUrl from '../../BaseUrl';

function Steps({ targetRef }) {
  const [ETAPE, setETAPE] = useState(1);
  const [s1_image, set_s1_image] = useState("");
  const [s2_image, set_s2_image] = useState("");
  const [s3_image, set_s3_image] = useState("");

  function goToForm(){
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if(!s1_image || !s2_image || !s3_image) get_s1s2s3Image();
  }, [s1_image, s2_image, s3_image])

  // get s1, s2 et s3 image
  async function get_s1s2s3Image(){
    // s1
    await fetch(`${BaseUrl}/api/get_image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whereUsed: 's1' })
    })
    .then(res => res.json())
    .then(res => set_s1_image(res))
    .catch(res => console.log(res))
    // s2
    await fetch(`${BaseUrl}/api/get_image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whereUsed: 's2' })
    })
    .then(res => res.json())
    .then(res => set_s2_image(res))
    .catch(res => console.log(res))
    // s3
    await fetch(`${BaseUrl}/api/get_image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ whereUsed: 's3' })
    })
    .then(res => res.json())
    .then(res => set_s3_image(res))
    .catch(res => console.log(res))
  }

  return (
    <div className='steps_container'>

      <p className='title'>Comment ca marche ?</p>

      <div className='steps_flex'>
        <div onClick={() => setETAPE(1)} style={{ color: `${ETAPE === 1 ? '#2C46CD' : 'black'}`, borderBottom: `${ETAPE === 1 ? '3px solid #2C46CD' : 'none'}` }} className='step_num'>1ère ETAPE</div>

        <div onClick={() => setETAPE(2)} style={{ color: `${ETAPE === 2 ? '#2C46CD' : 'black'}`, borderBottom: `${ETAPE === 2 ? '3px solid #2C46CD' : 'none'}` }} className='step_num'>2éme ETAPE</div>

        <div onClick={() => setETAPE(3)} style={{ color: `${ETAPE === 3 ? '#2C46CD' : 'black'}`, borderBottom: `${ETAPE === 3 ? '3px solid #2C46CD' : 'none'}` }} className='step_num'>3éme ETAPE</div>
      </div>

      <div style={{ display: `${ETAPE === 1 ? 'flex' : 'none'}` }} className='steps'>

        <div className='img_container'>
          <div className='num'>1</div>
          { s1_image && <img name="image" alt={s1_image.alt} src={s1_image.imageURL} /> }
        </div>

        <div className='texts'>
          <p>Réservez et validez votre commande en quelques clics</p>
          <p>Remplissez la forme si dessous, et attendez un message sera transmi a vous.</p>
        </div>

      </div>

      <div style={{ display: `${ETAPE === 2 ? 'flex' : 'none'}` }} className='steps'>

        <div className='img_container'>
          <div className='num'>2</div>
          { s2_image && <img name="image" alt={s2_image.alt} src={s2_image.imageURL} /> }
        </div>

        <div className='texts'>
          <p>L'expert se présente chez vous le jour et l'heure planifiée</p>
          <p>Une personne certifiée vient et nettoie vos instructions.</p>
        </div>

      </div>

      <div style={{ display: `${ETAPE === 3 ? 'flex' : 'none'}` }} className='steps'>

        <div className='img_container'>
          <div className='num'>3</div>
          { s3_image && <img name="image" alt={s3_image.alt} src={s3_image.imageURL} /> }
        </div>

        <div className='texts'>
          <p>Faire le ménage, souriez, c'est fait</p>
          <p>Détendez vous, profitez du résultat étincelant en un rien de temps.</p>
        </div>

      </div>

      <button onClick={() => goToForm()}>Réserver mon ménage</button>

    </div>
  )
}

export default Steps