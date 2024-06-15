// src/components/Popup.js
import React from 'react';
import './style.css'

const Popup = ({ title, content, subContent, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className='popup-content-padding'>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <p>{subContent}</p>
                </div>
                <button className="popup-button" onClick={onClose}>Okay</button>
            </div>
        </div>
    );
};

export default Popup;
