import React from 'react';
import './Scenes.css';

export default function Scenes(props){
    return (
        <div className='scenesmain'>
            <video autoPlay muted loop id='scenes'>
                <source src={props.video}/>
            </video>
        </div>
    );
}