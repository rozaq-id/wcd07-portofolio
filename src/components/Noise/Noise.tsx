import React from 'react';
import noiseImage from './images/noise.png';

interface NoiseProps {
  opacity?: number;
  backgroundSize?: number;
  className?: string;
}

const Noise: React.FC<NoiseProps> = ({ 
  opacity = 0.1, 
  backgroundSize = 128,
  className = '',
}) => {
  return (
    <div 
      className={`noise-container ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 4,
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          backgroundSize: `${backgroundSize}px`,
          backgroundRepeat: 'repeat',
          backgroundImage: `url(${noiseImage})`,
          opacity: opacity,
          borderRadius: 0,
          mixBlendMode: 'overlay' // This helps blend the noise with the dark background
        }}      />
    </div>
  );
};

export default Noise;
