import React, { useState } from 'react';

interface LogoEditFormProps {
  initialAltText: string;
  onSave: (newAltText: string) => void;
  onCancel: () => void;
}

const LogoEditForm: React.FC<LogoEditFormProps> = ({ initialAltText, onSave, onCancel }) => {
  const [altText, setAltText] = useState(initialAltText);

  const handleSave = () => {
    onSave(altText);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="alt-text" className="block text-sm font-medium text-gray-700">
          Texto Alternativo (para accesibilidad)
        </label>
        <input
          type="text"
          id="alt-text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
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

export default LogoEditForm;