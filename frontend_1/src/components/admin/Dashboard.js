import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import BaseUrl from '../../BaseUrl';

function Dashboard() {
  // const [researchBTN_active, set_researchBTN_active] = useState('all');
  const [all, set_all] = useState(true);
  const [done, set_done] = useState(false);
  const [not_done, set_not_done] = useState(false);
  
  const [message, set_message] = useState({ message: '', error: '' });
  const [reservations, set_reservations] = useState([]);
  
  const [emails, set_emails] = useState([]);
  const [emailsBox, set_emailsBox] = useState(false);

  const [modifyimagesBox, set_modifyimagesBox] = useState(false);
  const [alt, set_alt] = useState('');
  const [folder, set_folder] = useState('');
  const [whereUsed, set_whereUsed] = useState('');
  const [caption, set_caption] = useState('');
  const [Image, set_Image] = useState('');
  const [imageLoading, set_imageLoading] = useState(false);

  const [adminLoading, set_adminLoading] = useState(false);

  const [modifyAdminBox, set_modifyAdminBox] = useState(false);
  const [register_variables, set_register_variables] = useState({
    actual_email: '',
    new_email: '',
    re_email: '',
    actual_password: '',
    new_password: '',
    re_password: ''
  });
  function change_register_values(e){
    set_register_variables({...register_variables, [e.target.name]: e.target.value})
  }

  // function manage_BTNactive(e){
  //   set_researchBTN_active(e.target.name);
  // }

  useEffect(() => {
    if(emails.length === 0) get_emails()
  }, [emails])

  useEffect(() => {
    get_reservations();
  }, [all, done, not_done])

  function get_emails(){
    fetch(`${BaseUrl}/api/get_emails`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
        if(res.error){
          console.log(res.error)
        }
        else{
          set_emails(res);
        }
    })
    .catch(res => console.log(res))
  }

  function get_reservations(){
    fetch(`${BaseUrl}/api/get_reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({all, done, not_done})
    })
    .then(res => res.json())
    .then(res => {
        if(res.error){
          set_message({ message: '', error: res.error })
          setTimeout(() => set_message({ message: '', error: '' }), 5000)
        }
        else{
          set_reservations(res);
        }
    })
    .catch(res => console.log(res))
  }

  function modify_done_reservations(_id, done){
    fetch(`${BaseUrl}/api/modify_done`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id, done })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error){
          console.log(res.error)
        }
        if(res.message){
          console.log(res.message);
          get_reservations()
        }
    })
    .catch(res => console.log(res))
  }

  // research by number
  async function search_byPhone(search_string){
    // set_reservations([]);
    if(search_string !== 0)
    {
      await fetch(`${BaseUrl}/api/search_reservations_byNumber`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search_string })
      })
      .then(res => res.json())
      .then(res => {
          if(res.error){
            console.log(res.error)
            set_all(false);
            set_done(false);
            set_not_done(false);
            set_reservations([])
          }
          if(res.message){
            // console.log(res.reservationsFound)
            set_all(false);
            set_done(false);
            set_not_done(false);
            set_reservations(res.reservationsFound)
          }
      })
      .catch(res => console.log(res))
    }
  }

  async function search_byService(search_string){
    // set_reservations([]);
    if(search_string !== 0)
    {
      await fetch(`${BaseUrl}/api/search_reservations_byservice`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ search_string })
      })
      .then(res => res.json())
      .then(res => {
          if(res.error){
            console.log(res.error)
            set_all(false);
            set_done(false);
            set_not_done(false);
            set_reservations([])
          }
          if(res.message){
            // console.log(res.reservationsFound)
            set_all(false);
            set_done(false);
            set_not_done(false);
            set_reservations(res.reservationsFound)
          }
      })
      .catch(res => console.log(res))
    }
  }

  // Modify admin
  function ModifyAdmin(e){
    e.preventDefault()
    set_adminLoading(true);

    fetch(`${BaseUrl}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        actual_email: register_variables.actual_email,
        new_email: register_variables.new_email,
        re_email: register_variables.re_email,
        actual_password: register_variables.actual_password,
        new_password: register_variables.new_password,
        re_password: register_variables.re_password
      })
    })
    .then(res => res.json())
    .then(res => {
      if(res.error){
        set_message({message: '', error: res.error})
        setTimeout(() => set_message({message: '', error: ''}), 5000);
        set_adminLoading(false);
      }
      if(res.message){
        set_message({message: res.message, error: ''})
        setTimeout(() => set_message({message: '', error: ''}), 5000);
        set_register_variables({
          actual_email: '',
          new_email: '',
          re_email: '',
          actual_password: '',
          new_password: '',
          re_password: ''
        })
        set_adminLoading(false);
      }
    })
    .catch(res => console.log(res))
  }

  // add/modify image
  function modify_Image(e){
    e.preventDefault();

    set_imageLoading(true);

    const formData = new FormData();
    formData.append('image', Image);
    formData.append('alt', alt);
    formData.append('whereUsed', whereUsed);
    formData.append('folder', folder);
    formData.append('caption', caption);

    fetch(`${BaseUrl}/api/add_image`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      if(res.saved_image) {
        console.log(res.saved_image._id);
        console.log('saved image');
        set_alt('')
        set_folder ('')
        set_whereUsed('')
        set_caption('')
        set_Image('')
        set_imageLoading(false)
      }
      if(res.message) {
        console.log(res.message);
        set_message({ message: res.message, error: ''})
        setTimeout(() => { set_message({message: '', error: ''}) }, 5000)
        console.log('message');
        set_alt('')
        set_folder ('')
        set_whereUsed('')
        set_caption('')
        set_Image('')
        set_imageLoading(false)
      }
      if(res.error) {
        console.log(res.error);
        set_message({ message: '', error: res.error})
        setTimeout(() => { set_message({message: '', error: ''}) }, 5000)
        set_imageLoading(false)
      }
    })
  }

  return (
    <div className='dashboard_back'>
      <div className='dashboard_container'>
        <div className='reservations'>

          <input onChange={(e) => {
            search_byPhone(e.target.value);
            }} className='search_bar' type="text" name='search' placeholder='Recherche par téléphone...' />
          
          <select onChange={(e) => search_byService(e.target.value)} id='services'>
              <option value='Nettoyage à domicile'>Nettoyage à domicile</option>
              <option value='Nettoyage particulière, industriel et jardinage'>Nettoyage particulière, industriel et jardinage</option>
              <option value='Sécurité du travail'>Sécurité du travail</option>
              <option value='Mise à disposition des chaufeurs et nures'>Mise à disposition des chaufeurs et nures</option>
              <option value='Des actions de courtage'>Des actions de courtage</option>
              <option value='Evenementiel et sonorisation'>Evenementiel et sonorisation</option>
              <option value='Transport du Personnel et scolaire'>Transport du Personnel et scolaire</option>
              <option value='Travaux de fin de chantier'>Travaux de fin de chantier</option>
          </select>

          <div className='filter_btns'>

            <button name='all' onClick={() => {
              set_all(true);
              set_done(false);
              set_not_done(false);
              get_reservations()
            }} className={`${all && 'btn_selected'}`}>Tous</button>

            <button name='done' onClick={() => {
              set_done(true);
              set_all(false);
              set_not_done(false);
              get_reservations()
            }} className={`${done && 'btn_selected'}`}>Validé</button>

            <button name='not_done' onClick={() => {
              set_not_done(true);
              set_all(false);
              set_done(false);
              get_reservations()
            }} className={`${not_done && 'btn_selected'}`}>Non validé</button>
            
          </div>
          
          <div className='data_interface'>
            {
              reservations.length !== 0 && reservations.map((reservation) => <div className='reservation_card'>

                <div className='fullname'>
                  <div className='nom'>{reservation.first_name}</div>
                  <div className='prenom'>{reservation.last_name}</div>
                </div>

                <div className='email'>{reservation.email}</div>

                <div className='telephone'>{reservation.phone}</div>

                <div className='service'>{reservation.service}</div>

                <div className={`${reservation.done ? 'done' : 'not_done'}`}></div>

                <div className='date'>{reservation.created_at}</div>

                <div className='valid_btns'>
                  <button onClick={() => modify_done_reservations(reservation._id, true)} className='valid'>valider</button>
                  <button onClick={() => modify_done_reservations(reservation._id, false)} className='non_valid'>non-val</button>
                </div>
              </div>)
            }
          </div>
        </div>

        <div className='data'>
          <div className='data_result'>{reservations.length}</div>

          <div className='modify_tools'>
            <button onClick={() => {
              set_emailsBox(true);
              get_emails()
            }}>Liste des emails</button>

            <button onClick={() => {
              set_modifyAdminBox(true);
            }}>Modifier admin</button>

            <button onClick={() => {
              set_modifyimagesBox(true);
            }}>Modifier les images</button>
          </div>          
        </div>

        {/* email list pop UP */}
        { (emailsBox) && <div className='absolute'>

          <div className='email_list'>

            { emails.length !== 0 && emails.map(email => <p>{email.email}</p>) }

            <div onClick={() => set_emailsBox(false)} className='remove_list'>X</div>

          </div>
        </div> }

        {/* admin box pop UP */}
        { (modifyAdminBox) && <div className='absolute'>

          <div className='login_container'>
            {
              message.error !== '' && 
                (<div style={{ backgroundColor: 'red', color: 'white' }}>{message.error}</div>)
            }
            {
              message.message !== '' && 
                (<div style={{ backgroundColor: 'green', color: 'white' }}>{message.message}</div>)
            }
            <form>
                <label>Email actuel:</label>
                <input onChange={(e) => change_register_values(e)} name='actual_email' type="email" placeholder='email actuel...' value={register_variables.actual_email} />

                <label>Nouveau email:</label>
                <input onChange={(e) => change_register_values(e)} name='new_email' type="email" placeholder='nouveau email...' value={register_variables.new_email} />

                <label>Re-email:</label>
                <input onChange={(e) => change_register_values(e)} name='re_email' type="email" placeholder='re-email...' value={register_variables.re_email} />
                
                <label>Password actuel:</label>
                <input onChange={(e) => change_register_values(e)} name='actual_password' type="password" placeholder='Password actuel...' value={register_variables.actual_password} />

                <label>Nouveau password:</label>
                <input onChange={(e) => change_register_values(e)} name='new_password' type="password" placeholder='Nouveau password...' value={register_variables.new_password} />

                <label>Re-password:</label>
                <input onChange={(e) => change_register_values(e)} name='re_password' type="password" placeholder='re-password...' value={register_variables.re_password} />
                
                <button style={{ opacity: `${adminLoading ? '0.5' : '1'}`, cursor: `${adminLoading ? 'none' : 'pointer'}`, pointerEvents: `${adminLoading ? 'none' : 'all'}` }} onClick={(e) => ModifyAdmin(e)}>{adminLoading ? 'Loading...' : 'Modifier'}</button>
            </form>

            <div onClick={() => set_modifyAdminBox(false)} className='remove_list'>X</div>
          </div>
        </div> }

        {/* image box pop UP */}
        { (modifyimagesBox) && <div className='absolute'>

          <div className='imageBox'>
            {
              message.error !== '' && 
                (<div style={{ backgroundColor: 'red', color: 'white' }}>{message.error}</div>)
            }
            {
              message.message !== '' && 
                (<div style={{ backgroundColor: 'green', color: 'white' }}>{message.message}</div>)
            }
            <div className="title">Modifier une Image</div>
            
            {/* Adding image */}
            <input onChange={(e) => {
              set_Image(e.target.files[0])                
            }} type="file" accept='image/*' name='image' id='import_Image' />

            <label>Quel fichier?</label>
            <select onChange={(e) => set_folder(e.target.value)} id='services'>
                <option value='none'>None</option>
                <option value='logo'>Logo</option>
                <option value='showcase'>Showcase</option>
                <option value='steps'>Steps</option>
                <option value='services'>Services</option>
            </select>

            <label>Utiliser ou?</label>
            <select onChange={(e) => { set_whereUsed(e.target.value) }} id='services'>
                {
                  folder === 'none' && <option value='none'>None</option>
                }
                {
                  folder === 'logo' && (<>
                    <option value='none'>None</option>
                    <option value='logo'>logo</option>
                  </>)

                }
                {
                  folder === 'showcase' && (<>
                  <option value='none'>None</option>
                  <option value='showcase'>showcase</option>
                </>)
                }
                {
                  folder === 'steps' && (<>
                    <option value='none'>None</option>
                    <option value='s1'>s1</option>
                    <option value='s2'>s2</option>
                    <option value='s3'>s3</option>
                  </>)
                }
                {
                  folder === 'services' && (<>
                    <option value='none'>None</option>
                    <option value='Nettoyage à domicile'>Nettoyage à domicile</option>
                    <option value='Nettoyage particulière, industriel et jardinage'>Nettoyage particulière, industriel et jardinage</option>
                    <option value='Sécurité du travail'>Sécurité du travail</option>
                    <option value='Mise à disposition des chaufeurs et nures'>Mise à disposition des chaufeurs et nures</option>
                    <option value='Des actions de courtage'>Des actions de courtage</option>
                    <option value='Evenementiel et sonorisation'>Evenementiel et sonorisation</option>
                    <option value='Transport du Personnel et scolaire'>Transport du Personnel et scolaire</option>
                    <option value='Travaux de fin de chantier'>Travaux de fin de chantier</option>
                  </>)
                }
            </select>

            <label>Caption:</label>
            <input onChange={(e) => set_caption(e.target.value)} name='caption' type="texte" placeholder='Caption...' value={caption} />

            <button style={{ opacity: `${imageLoading ? '0.5' : '1'}`, cursor: `${imageLoading ? 'none' : 'pointer'}`, pointerEvents: `${imageLoading ? 'none' : 'all'}` }} onClick={(e) => modify_Image(e)}>{imageLoading ? 'Loading...' : 'Modifier Image'}</button>

            <div onClick={() => set_modifyimagesBox(false)} className='remove_list'>X</div>

          </div>
        </div> }

      </div>
    </div>
  )
}

export default Dashboard