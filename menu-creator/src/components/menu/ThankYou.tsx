import React from 'react';

interface ThankYouProps {
  text: string;
  font?: string;
  color?: string;
  onDoubleClick: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ text, font, color, onDoubleClick }) => {
  return (
    <p
      onDoubleClick={onDoubleClick}
      className={`text-center text-sm text-gray-600 italic mt-8 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors ${font}`}
      style={{ color: color }}
    >
      {text}
    </p>
  );
};

export default ThankYou;