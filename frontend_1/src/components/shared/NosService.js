import React, { useState, useEffect } from 'react';
import './NosService.css';
import BaseUrl from '../../BaseUrl';

function NosService({ targetRef }) {
    const [services, set_services] = useState("");

    function goToForm(){
        targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        if(!services) get_servicesImages();
      }, [services])
    
      // get services image
      async function get_servicesImages(){
        await fetch(`${BaseUrl}/api/get_all_services_images`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(res => set_services(res))
        .catch(res => console.log(res))
      }

  return (
    <div className='NosService_container'>
        <p>Nos services</p>

        <p>Libérez votre temps pour les choses qui comportent vraiment. On s'occupe de tout.</p>

        <div className='cards_container'>

            { 
                services && services.map((service) => <div className='card'>
                    <div className='img_container'>
                        <img name="image" alt={service.alt} src={service.imageURL} />
                    </div>
                    <p>{service.name}</p>
                    <p>{service.caption}</p>
                </div>)
            }

        </div>

        <button onClick={() => goToForm()}>Réserver</button>
    </div>
  )
}

export default NosService