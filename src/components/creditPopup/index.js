import React, { useEffect } from 'react';
import './style.css';
import CreditIcon from '../../assets/cashbackCredit.png'; // Make sure to use the correct path to your icon

const CreditPopup = ({ amount, showAnimation, showCreditPopup }) => {

    useEffect(() => {
        // Lock scroll when the popup is displayed
        document.body.style.overflow = 'hidden';

        // Unlock scroll when the popup is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!showAnimation) {
        return null;
    }
    return (
        <div className={`popup-overlay ${!showCreditPopup ? 'hidden' : ''}`}>
            <div className="credit-popup-content">
                <img src={CreditIcon} alt="Credit Icon" className="credit-popup-icon" />
                <div className="credit-popup-amount">${amount}</div>
                <div className="credit-popup-status">Credited</div>
            </div>
        </div>
    );
};
export default CreditPopup;
