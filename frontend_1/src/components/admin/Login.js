import React, { useState } from 'react';
import './Login.css';
import Dashboard from './Dashboard';
import BaseUrl from '../../BaseUrl';

function Login() {
    const [login_variables, set_login_variables] = useState({
        email: '',
        password: ''
    });
    const [userAproved, set_userAproved] = useState(false);
    const [message, set_message] = useState({
        valid: '',
        error: ''
    });
    const [Loading, set_Loading] = useState(false);

    function change_login_values(e){
        set_login_variables({...login_variables, [e.target.name]: e.target.value})
    }

    function AddAdmin(e){
        e.preventDefault();

        set_Loading(true);

        fetch(`${BaseUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: login_variables.email, 
                password: login_variables.password
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error){
                set_message({ error: res.error })
                setTimeout(() => { set_message({ error: '' }) }, 5000)
                set_Loading(false);
            }
            if(res.message){
                set_message({ message: res.message })
                setTimeout(() => { set_message({ message: '' }) }, 5000)
                set_Loading(false);

                set_userAproved(true);
            }
        })
        .catch(res => console.log(res))
    }

  return (
    <>
    {
    !userAproved ? (
        <div className='login' >
        <div className="login_container">

            {
                message.error !== '' && 
                    (<div style={{ backgroundColor: 'red', color: 'white' }}>{message.error}</div>)
            }
            {
                message.valid !== '' && 
                    (<div style={{ backgroundColor: 'green', color: 'white' }}>{message.valid}</div>)
            }

            <div className="title">P4U</div>

            <form>
                <label>email:</label>
                <input onChange={(e) => change_login_values(e)} name='email' type="email" placeholder='email...' value={login_variables.email} />
                
                <label>password:</label>
                <input onChange={(e) => change_login_values(e)} name='password' type="password" placeholder='password...' value={login_variables.password} />
                
                <button style={{ opacity: `${Loading ? '0.5' : '1'}`, cursor: `${Loading ? 'none' : 'pointer'}`, pointerEvents: `${Loading ? 'none' : 'all'}` }} onClick={(e) => AddAdmin(e)}>{Loading ? 'Loading...' : 'Login'}</button>

            </form>

        </div>
    </div>
    ) : <Dashboard />
    }
    </>
  )
}

export default Login