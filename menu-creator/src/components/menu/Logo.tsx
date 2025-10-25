import React from 'react';

interface LogoProps {
  src: string;
  size: 'small' | 'medium' | 'large';
  position: 'left' | 'center' | 'right';
}

const Logo: React.FC<LogoProps> = ({ src, size, position }) => {
  // Map size props to Tailwind CSS width classes
  const sizeClasses = {
    small: 'w-16 h-16', // approx 64px
    medium: 'w-24 h-24', // approx 96px
    large: 'w-32 h-32', // approx 128px
  };

  // Map position props to Tailwind CSS flexbox classes
  const positionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div className={`flex ${positionClasses[position]} my-4`}>
      <img
        src={src}
        alt="Logo del negocio"
        className={`${sizeClasses[size]} object-contain`}
      />
    </div>
  );
};

export default Logo;