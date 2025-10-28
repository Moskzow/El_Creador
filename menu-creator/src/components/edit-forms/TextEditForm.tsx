import React, { useState } from 'react';

interface FontOption {
  value: string;
  label: string;
}

interface TextEditFormProps {
  initialValues: {
    text: string;
    font?: string;
    color?: string;
  };
  fontOptions: FontOption[];
  onSave: (newValues: TextEditFormProps['initialValues']) => void;
  onCancel: () => void;
  onDelete: () => void;
  label?: string;
}

const TextEditForm: React.FC<TextEditFormProps> = ({ initialValues, fontOptions, onSave, onCancel, onDelete, label = "Texto" }) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, color: e.target.value }));
  };

  const handleSave = () => {
    onSave(values);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">{label}</label>
        <input type="text" name="text" id="text" value={values.text} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
      </div>
      <hr />
      <div>
        <label htmlFor="font" className="block text-sm font-medium text-gray-700">Tipografía Específica (opcional)</label>
        <select name="font" id="font" value={values.font || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          <option value="">Usar tipografía global</option>
          {fontOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color Específico (opcional)</label>
        <input type="color" name="color" id="color" value={values.color || '#000000'} onChange={handleColorChange} className="mt-1 block w-full h-10 p-1 border border-gray-300 rounded-md" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <div>
          <button onClick={onDelete} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Eliminar
          </button>
        </div>
        <div className="flex space-x-3">
          <button onClick={onCancel} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancelar</button>
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Guardar Cambios</button>
        </div>
      </div>
    </div>
  );
};

export default TextEditForm;