import React from 'react';

interface ProductItemProps {
  name: string;
  description: string;
  price: string;
  font?: string;
  color?: string;
  onDoubleClick: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, description, price, font, color, onDoubleClick }) => {
  return (
    <div
      onDoubleClick={onDoubleClick}
      className={`my-4 p-2 rounded-md transition-colors cursor-pointer hover:bg-blue-100 ${font}`}
      style={{ color: color }}
    >
      <div className="flex justify-between items-baseline">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-lg font-semibold">{price} €</p>
      </div>
      <p className="text-sm mt-1 opacity-80">
        {description}
      </p>
    </div>
  );
};

export default ProductItem;