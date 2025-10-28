import React from 'react';

interface SeparatorProps {
  onDelete: () => void;
}

const Separator: React.FC<SeparatorProps> = ({ onDelete }) => {
  return (
    <div className="my-6 relative group">
      <hr className="border-t border-gray-300" />
      <button
        onClick={onDelete}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Eliminar separador"
      >
        &times;
      </button>
    </div>
  );
};

export default Separator;