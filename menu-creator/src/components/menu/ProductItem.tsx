import React from 'react';

interface ProductItemProps {
  name: string;
  description: string;
  price: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, description, price }) => {
  return (
    <div className="my-4">
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-lg font-semibold text-gray-800">{price} €</p>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {description}
      </p>
    </div>
  );
};

export default ProductItem;