import React from 'react';

interface SectionTitleProps {
  title: string;
  onDoubleClick: () => void;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="mt-8 mb-4 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors"
    >
      <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;