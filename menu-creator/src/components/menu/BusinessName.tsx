import React from 'react';

interface BusinessNameProps {
  name: string;
}

const BusinessName: React.FC<BusinessNameProps> = ({ name }) => {
  return (
    <div className="text-center my-8">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        {name}
      </h1>
    </div>
  );
};

export default BusinessName;