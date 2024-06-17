import React from 'react';
import ProfilePictureIcon from '../../assets/profilePicture.png';

const ProfilePicture = () => {
    return (
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            x="45%"
            y="20%"
        >
            {/* Define a clipPath to make the image circular */}
            <defs>
                <clipPath id="circleClip">
                    <circle cx="20" cy="20" r="18" />
                </clipPath>
            </defs>

            {/* Render the circular border */}
            <circle
                cx="20"
                cy="20"
                r="18"
                stroke="#7DB3E7" // Adjust the border color as needed
                strokeWidth="2"
                fill="none"
            />

            {/* Render the profile picture */}
            <image
                href={ProfilePictureIcon}
                x="2"
                y="2"
                width="36"
                height="36"
                clipPath="url(#circleClip)"
                style={{
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                }}
            />
        </svg>
    );
};

export default ProfilePicture;