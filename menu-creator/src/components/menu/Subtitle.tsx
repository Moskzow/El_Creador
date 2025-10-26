import React from 'react';

interface SubtitleProps {
  text: string;
  onDoubleClick: () => void;
}

const Subtitle: React.FC<SubtitleProps> = ({ text, onDoubleClick }) => {
  return (
    <h2
      onDoubleClick={onDoubleClick}
      className="text-xl text-gray-700 text-center my-4 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors"
    >
      {text}
    </h2>
  );
};

export default Subtitle;