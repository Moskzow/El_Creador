import React from 'react';

// This component now needs to know about Rnd, which is loaded globally.
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
  // Check if Rnd is available on the window object
  if (typeof Rnd === 'undefined') {
    // Render a fallback or nothing if the library isn't loaded yet
    return <p>Cargando componente interactivo...</p>;
  }

  return (
    <Rnd
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
      bounds="parent" // Constrains dragging to the parent container
      lockAspectRatio={true} // Keeps the aspect ratio when resizing
      className="border-2 border-dashed border-transparent hover:border-blue-500 transition-colors"
      onDoubleClick={onDoubleClick}
    >
      <img
        src={src}
        alt={altText}
        className="w-full h-full object-contain"
        style={{ pointerEvents: 'none' }} // Prevents image from interfering with drag events
      />
    </Rnd>
  );
};

export default Logo;