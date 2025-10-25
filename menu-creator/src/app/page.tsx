"use client";

import { useState, useRef } from 'react';
import BusinessName from '@/components/menu/BusinessName';
import SectionTitle from '@/components/menu/SectionTitle';
import ProductItem from '@/components/menu/ProductItem';
import Logo from '@/components/menu/Logo';

// --- Type Definitions ---
interface BusinessNameContent { name: string; }
interface SectionTitleContent { title: string; }
interface ProductContent { name: string; description: string; price: string; }

interface MenuElement {
  id: string;
  type: 'businessName' | 'sectionTitle' | 'product';
  content: BusinessNameContent | SectionTitleContent | ProductContent;
}

interface LogoState {
  src: string;
  size: 'small' | 'medium' | 'large';
  position: 'left' | 'center' | 'right';
}

// --- TypeScript Declarations for CDN Libraries ---
declare const html2canvas: any;
declare const jspdf: any;

// --- Font Options ---
const fontOptions = [
  { value: 'font-sans', label: 'Inter (Sans-serif)' },
  { value: 'font-roboto', label: 'Roboto (Sans-serif)' },
  { value: 'font-montserrat', label: 'Montserrat (Sans-serif)' },
  { value: 'font-lora', label: 'Lora (Serif)' },
  { value: 'font-oswald', label: 'Oswald (Display)' },
];

export default function EditorPage() {
  // --- State and Refs ---
  const [menuElements, setMenuElements] = useState<MenuElement[]>([]);
  const [logo, setLogo] = useState<LogoState | null>(null);
  const [font, setFont] = useState('font-sans');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#171717');
  const menuPreviewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Element Handling ---
  const addElement = (type: MenuElement['type']) => {
    let newElement: MenuElement;
    switch (type) {
      case 'businessName': newElement = { id: crypto.randomUUID(), type, content: { name: 'Nombre del Negocio' } }; break;
      case 'sectionTitle': newElement = { id: crypto.randomUUID(), type, content: { title: 'Nueva Sección' } }; break;
      case 'product': newElement = { id: crypto.randomUUID(), type, content: { name: 'Nuevo Producto', description: 'Descripción...', price: '9.99' } }; break;
      default: return;
    }
    setMenuElements([...menuElements, newElement]);
  };

  const renderElement = (element: MenuElement) => {
    switch (element.type) {
      case 'businessName': return <BusinessName {...(element.content as BusinessNameContent)} />;
      case 'sectionTitle': return <SectionTitle {...(element.content as SectionTitleContent)} />;
      case 'product': return <ProductItem {...(element.content as ProductContent)} />;
      default: return null;
    }
  };

  // --- Logo Handling ---
  const handleLogoUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo({
          src: e.target?.result as string,
          size: 'medium', // Default size
          position: 'center', // Default position
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateLogo = (prop: keyof LogoState, value: LogoState[keyof LogoState]) => {
    if (logo) {
      setLogo({ ...logo, [prop]: value });
    }
  };

  // --- PDF Export Logic ---
  const handleExportPDF = () => {
    const menuElement = menuPreviewRef.current;
    if (!menuElement) return;

    html2canvas(menuElement, {
      scale: 2, // Improve resolution
      useCORS: true, // Important for fonts and images
    }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;

      // A4 paper size: 210mm x 297mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;

      let imgWidth = pdfWidth;
      let imgHeight = imgWidth / ratio;

      // If the image is taller than the page, scale it down
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * ratio;
      }

      const x = (pdfWidth - imgWidth) / 2;
      const y = 0;

      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
      pdf.save('menu.pdf');
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* --- Sidebar --- */}
      <aside className="w-1/4 bg-white p-6 shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Herramientas</h2>

        {/* Logo Section */}
        <div className="space-y-3">
          <input type="file" ref={fileInputRef} onChange={handleLogoFileChange} className="hidden" accept="image/*" />
          <button onClick={handleLogoUploadClick} className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
            {logo ? 'Cambiar Logo' : 'Cargar Logo'}
          </button>
          {logo && (
            <div className="space-y-4 pt-2 border-t mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posición del Logo</label>
                <div className="flex justify-between rounded-lg bg-gray-100 p-1">
                  <button onClick={() => updateLogo('position', 'left')} className={`w-full p-1 text-sm rounded-md ${logo.position === 'left' ? 'bg-blue-500 text-white shadow' : ''}`}>Izquierda</button>
                  <button onClick={() => updateLogo('position', 'center')} className={`w-full p-1 text-sm rounded-md ${logo.position === 'center' ? 'bg-blue-500 text-white shadow' : ''}`}>Centro</button>
                  <button onClick={() => updateLogo('position', 'right')} className={`w-full p-1 text-sm rounded-md ${logo.position === 'right' ? 'bg-blue-500 text-white shadow' : ''}`}>Derecha</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño del Logo</label>
                <div className="flex justify-between rounded-lg bg-gray-100 p-1">
                  <button onClick={() => updateLogo('size', 'small')} className={`w-full p-1 text-sm rounded-md ${logo.size === 'small' ? 'bg-blue-500 text-white shadow' : ''}`}>Pequeño</button>
                  <button onClick={() => updateLogo('size', 'medium')} className={`w-full p-1 text-sm rounded-md ${logo.size === 'medium' ? 'bg-blue-500 text-white shadow' : ''}`}>Mediano</button>
                  <button onClick={() => updateLogo('size', 'large')} className={`w-full p-1 text-sm rounded-md ${logo.size === 'large' ? 'bg-blue-500 text-white shadow' : ''}`}>Grande</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <hr className="my-6" />

        <div className="space-y-3">
          <button onClick={() => addElement('businessName')} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Añadir Nombre</button>
          <button onClick={() => addElement('sectionTitle')} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Añadir Sección</button>
          <button onClick={() => addElement('product')} className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Añadir Producto</button>
        </div>

        <hr className="my-6" />
        <h2 className="text-xl font-bold mb-6">Personalización</h2>
        <div className="space-y-4">
          <div><label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-1">Tipografía</label><select id="font-select" value={font} onChange={(e) => setFont(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">{fontOptions.map(option => (<option key={option.value} value={option.value}>{option.label}</option>))}</select></div>
          <div><label htmlFor="bg-color" className="block text-sm font-medium text-gray-700 mb-1">Color de Fondo</label><input id="bg-color" type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-lg"/></div>
          <div><label htmlFor="text-color" className="block text-sm font-medium text-gray-700 mb-1">Color de Texto</label><input id="text-color" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-lg"/></div>
        </div>
        <hr className="my-6" />
        <button onClick={handleExportPDF} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
          Exportar a PDF
        </button>
      </aside>

      {/* --- Menu Preview --- */}
      <main className="w-3/4 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Vista Previa del Menú</h1>
        <div
          ref={menuPreviewRef}
          className={`w-full max-w-2xl mx-auto p-12 shadow-lg min-h-[70vh] transition-colors ${font}`}
          style={{ backgroundColor: backgroundColor, color: textColor }}
        >
          {/* Render the logo if it exists */}
          {logo && <Logo {...logo} />}

          {/* Render menu elements */}
          {menuElements.length === 0 && !logo ? (<p className="text-center opacity-50">Añade elementos para crear tu menú.</p>) : (<div className="space-y-4">{menuElements.map(element => <div key={element.id}>{renderElement(element)}</div>)}</div>)}
        </div>
      </main>
    </div>
  );
}