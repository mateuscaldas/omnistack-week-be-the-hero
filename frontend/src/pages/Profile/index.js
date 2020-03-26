import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg'

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }
        catch (err) {
            alert('Fail to delete incident!');
        }
    }

    async function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">            
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Welcome, {ongName}!</span>

                <Link className="button" to='/incidents/new' >Register a new incident</Link>
                <button onClick={handleLogout} type="buton">
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>

            <h1>Registered Incidents</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>INCIDENT:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>VALUE:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type='button'>
                            <FiTrash2 size={20} color='#a8a8b3' />
                        </button>
                    </li>                      
                ))}
            </ul>
        </div>
    );
};