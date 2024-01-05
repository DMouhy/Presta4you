import React, { useEffect, useState } from 'react';
import './Showcase.css';
import BaseUrl from '../../BaseUrl';

function Showcase({ targetRef }) {
  const [showcase_image, set_showcase_image] = useState("");

  // scroll to
  function goToForm(){
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if(!showcase_image) get_showcaseImage();
  }, [showcase_image])

  // get showcase image
  async function get_showcaseImage(){
    await fetch(`${BaseUrl}/api/get_image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whereUsed: 'showcase' })
    })
    .then(res => res.json())
    .then(res => set_showcase_image(res))
    .catch(res => console.log(res))
  }

  return (
    <div className='showcase_container'>
        <div className='writing_area'>
            <p><span>1<sup>er</sup></span> Société de Nettoyage à Casablanca.</p>

            <p>service de nettoyage à domicile ou au bureau et de qualité</p>

            <button onClick={() => goToForm()}>Réserver mon ménage</button>
        </div>
        <div className='image_area'>
          { showcase_image && <img name="image" alt={showcase_image.alt} src={showcase_image.imageURL} /> }
        </div>
    </div>
  )
}

export default Showcase