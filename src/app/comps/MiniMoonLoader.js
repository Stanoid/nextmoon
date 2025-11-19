import React from 'react';
import Logowhite from "../../../public/logoblack.svg";

const MiniMoonLoader = ({ size = 'md' }) => {
  const sizes = {
    sm: { width: '48px', height: '20px' },
    md: { width: '64px', height: '27px' },
    lg: { width: '96px', height: '40px' },
    xl: { width: '128px', height: '53px' }
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div className="inline-block" style={{
      animation: 'fadeInOut 2s ease-in-out infinite'
    }}>
      {Logowhite && (
        <Logowhite
          style={{ 
            width: currentSize.width, 
            height: currentSize.height 
          }}
        />
      )}
    </div>
  );
};

export default MiniMoonLoader;
