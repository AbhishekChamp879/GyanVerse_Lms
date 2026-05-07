import React from 'react';
import { assets } from '../../assets/assets';

const Rating = ({
  rating = 0,
  interactive = false,
  onRate,
  size = 'w-3.5 h-3.5',
  label,
  showValue = false,
  ratingCount,
  className = '',
}) => {
  const roundedRating = Number(rating) || 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <p className='text-sm sm:text-base text-gray-700 font-medium'>{label}</p>}

      <div className='flex items-center gap-1'>
        {Array(5).fill('').map((_, i) => {
          const starValue = i + 1;
          const starSrc = i < Math.floor(roundedRating) ? assets.star : assets.star_blank;

          if (interactive) {
            return (
              <button
                key={starValue}
                type='button'
                onClick={() => onRate?.(starValue)}
                className='cursor-pointer'
                aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
              >
                <img
                  src={starSrc}
                  alt='rate star'
                  className={size}
                />
              </button>
            );
          }

          return (
            <img
              key={starValue}
              src={starSrc}
              alt='star'
              className={size}
            />
          );
        })}
      </div>

      {showValue && (
        <p className='text-xs text-gray-600'>
          {roundedRating.toFixed(1)}{typeof ratingCount === 'number' ? ` (${ratingCount} ratings)` : ''}
        </p>
      )}
    </div>
  );
};

export default Rating;
