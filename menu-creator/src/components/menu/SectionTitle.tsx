import React from 'react';

interface SectionTitleProps {
  title: string;
  font?: string;
  color?: string;
  onDoubleClick: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, font, color, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className={`mt-8 mb-4 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors ${font}`}
      style={{ color: color }}
    >
      <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;