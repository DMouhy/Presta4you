import React, { useState, useEffect } from 'react';
import './Header.css';
import BaseUrl from '../../BaseUrl';

function Header({ targetRef }) {
  const [logo_image, set_logo_image] = useState("");

  function goToForm(){
    targetRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if(!logo_image) get_logoImage();
  }, [logo_image])

  // get logo image
  async function get_logoImage(){
    await fetch(`${BaseUrl}/api/get_image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whereUsed: 'logo' })
    })
    .then(res => res.json())
    .then(res => set_logo_image(res))
    .catch(res => console.log(res))
  }

  return (
    <div className='header_container'>

        <div className='logo_container'>
          { logo_image && <img name="image" alt={logo_image.alt} src={logo_image.imageURL} /> }
        </div>

        <button onClick={() => goToForm()}>Réserver</button>
    </div>
  )
}

export default Header