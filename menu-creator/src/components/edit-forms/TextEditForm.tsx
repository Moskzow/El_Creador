import React, { useState } from 'react';

interface TextEditFormProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
  label?: string;
}

const TextEditForm: React.FC<TextEditFormProps> = ({ initialValue, onSave, onCancel, label = "Texto" }) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    onSave(value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text-input" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          id="text-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default TextEditForm;