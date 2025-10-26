import React from 'react';

interface BusinessNameProps {
  name: string;
  onDoubleClick: () => void;
}

const BusinessName: React.FC<BusinessNameProps> = ({ name, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className="text-center my-8 cursor-pointer hover:bg-blue-100 p-2 rounded-md transition-colors"
    >
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {name}
      </h1>
    </div>
  );
};

export default BusinessName;