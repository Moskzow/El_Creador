import React from 'react';

interface BusinessNameProps {
  name: string;
  font?: string;
  color?: string;
  onDoubleClick: () => void;
}

const BusinessName: React.FC<BusinessNameProps> = ({ name, font, color, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className={`text-center my-8 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors ${font}`}
      style={{ color: color }}
    >
      <h1 className="text-4xl font-bold tracking-tight">
        {name}
      </h1>
    </div>
  );
};

export default BusinessName;