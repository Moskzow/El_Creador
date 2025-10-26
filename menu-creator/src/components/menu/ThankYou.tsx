import React from 'react';

interface ThankYouProps {
  text: string;
  onDoubleClick: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ text, onDoubleClick }) => {
  return (
    <p
      onDoubleClick={onDoubleClick}
      className="text-center text-sm text-gray-600 italic mt-8 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors"
    >
      {text}
    </p>
  );
};

export default ThankYou;