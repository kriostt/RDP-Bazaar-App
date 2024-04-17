import React, { useState } from 'react';

const StarRating = ({ rating, onRatingChange }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const handleMouseEnter = (index) => {
        setHoverRating(index);
        console.log("mouse enter")
    };

    const handleMouseLeave = () => {
        // Do not reset hoverRating here
        console.log("mouse leave")
    };

    const handleClick = (index) => {
        onRatingChange(index);
    };

    return (
        <div>
             <label>Rate Star:  </label>
            {[...Array(5)].map((_, index) => {
                const starNumber = index + 1;
                return (
                    <span
                        key={starNumber}
                        className={`fa fa-star ${rating >= starNumber || hoverRating >= starNumber ? 'checked' : ''}`}
                        onMouseEnter={() => handleMouseEnter(starNumber)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starNumber)}
                        style={{ color: (rating >= starNumber || hoverRating >= starNumber) ? 'yellow' : 'gray', fontSize: '20px' }}
                    ></span>
                );
            })}
        </div>
    );
};

export default StarRating;
