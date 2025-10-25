import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="mt-8 mb-4">
      <h2 className="text-2xl font-semibold border-b-2 border-gray-300 pb-2">
        {title}
      </h2>
    </div>
  );
};

export default SectionTitle;