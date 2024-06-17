import React from 'react';
import './style.css';
import { categories } from '../../constants/index';

const CategoryGrouping = ({ selectedSegment }) => {

    return (
        <div className="categories">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className={`category-item ${selectedSegment === index ? 'selected' : ''}`}
                >
                    <div className={`square-color-box ${selectedSegment === index ? 'selected' : ''}`} style={{ background: category.color }} /> {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryGrouping;