import React from 'react';
import './dashboard-item.css';

export default function Item(props){
    return (
        <div className="item">
            <img className='dashboardimg' alt='products' src={props.img}/>
            <div className="itembtscn">
                <h3>{props.title}</h3>
            </div>
        </div>
    );
}