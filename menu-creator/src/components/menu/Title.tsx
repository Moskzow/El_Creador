import React from 'react';

interface TitleProps {
  text: string;
  font?: string;
  color?: string;
  onDoubleClick: () => void;
}

const Title: React.FC<TitleProps> = ({ text, font, color, onDoubleClick }) => {
  return (
    <h1
      onDoubleClick={onDoubleClick}
      className={`text-3xl font-bold text-center my-6 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors ${font}`}
      style={{ color: color }}
    >
      {text}
    </h1>
  );
};

export default Title;