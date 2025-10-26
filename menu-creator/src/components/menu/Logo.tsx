import React, { useState, useEffect } from 'react';

// We still need the global declaration for TypeScript
declare const Rnd: any;

interface LogoProps {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
  altText: string;
  onUpdate: (updates: { x: number; y: number; width: number; height: number }) => void;
  onDoubleClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ src, width, height, x, y, altText, onUpdate, onDoubleClick }) => {
  const [RndComponent, setRndComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Check if the Rnd library is available on the window object.
    // This will run after the component mounts and the external script has likely loaded.
    if (typeof Rnd !== 'undefined') {
      setRndComponent(() => Rnd);
    }
  }, []); // The empty dependency array ensures this effect runs only once on mount.

  // If the Rnd component hasn't been loaded yet, show the loading message.
  if (!RndComponent) {
    return <p className="text-center text-gray-500">Cargando componente interactivo...</p>;
  }

  return (
    <RndComponent
      size={{ width, height }}
      position={{ x, y }}
      onDragStop={(e: any, d: { x: number; y: number }) => {
        onUpdate({ x: d.x, y: d.y, width, height });
      }}
      onResizeStop={(e: any, direction: any, ref: { style: { width: string; height: string; } }, delta: any, position: { x: number; y: number }) => {
        onUpdate({
          ...position,
          width: parseInt(ref.style.width, 10),
          height: parseInt(ref.style.height, 10),
        });
      }}
      bounds="parent"
      lockAspectRatio={true}
      className="border-2 border-dashed border-transparent hover:border-blue-500 transition-colors"
      onDoubleClick={onDoubleClick}
    >
      <img
        src={src}
        alt={altText}
        className="w-full h-full object-contain"
        style={{ pointerEvents: 'none' }}
      />
    </RndComponent>
  );
};

export default Logo;