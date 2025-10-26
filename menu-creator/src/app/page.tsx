"use client";

import { useState, useRef } from 'react';
import BusinessName from '@/components/menu/BusinessName';
import SectionTitle from '@/components/menu/SectionTitle';
import ProductItem from '@/components/menu/ProductItem';
import Logo from '@/components/menu/Logo';
import Modal from '@/components/common/Modal';
import LogoEditForm from '@/components/edit-forms/LogoEditForm';

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
  width: number;
  height: number;
  x: number;
  y: number;
  altText: string;
}

// --- TypeScript Declarations for CDN Libraries ---
declare const html2canvas: any;
declare const jspdf: any;
declare const Rnd: any;

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
  const [editingElement, setEditingElement] = useState<any>(null);
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
  const handleLogoUploadClick = () => { fileInputRef.current?.click(); };
  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo({
          src: e.target?.result as string,
          width: 150, height: 150, x: 50, y: 50,
          altText: 'Logo del negocio',
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const updateLogoState = (newState: Partial<LogoState>) => {
    if (logo) { setLogo({ ...logo, ...newState }); }
  };

  // --- Modal Handling ---
  const openModal = (element: any) => { setEditingElement(element); };
  const closeModal = () => { setEditingElement(null); };
  const handleSaveLogo = (newAltText: string) => {
    if (logo) { updateLogoState({ altText: newAltText }); }
    closeModal();
  };

  // --- PDF Export Logic ---
  const handleExportPDF = () => {
    const menuElement = menuPreviewRef.current;
    if (!menuElement) return;
    html2canvas(menuElement, { scale: 2, useCORS: true }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = jspdf;
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let imgWidth = pdfWidth;
      let imgHeight = imgWidth / ratio;
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight * ratio;
      }
      pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, 0, imgWidth, imgHeight);
      pdf.save('menu.pdf');
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* --- Sidebar --- */}
      <aside className="w-1/4 bg-white p-6 shadow-md overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Herramientas</h2>
        <div className="space-y-3">
          <input type="file" ref={fileInputRef} onChange={handleLogoFileChange} className="hidden" accept="image/*" />
          <button onClick={handleLogoUploadClick} className="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700">
            {logo ? 'Cambiar Logo' : 'Cargar Logo'}
          </button>
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
        <button onClick={handleExportPDF} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700">
          Exportar a PDF
        </button>
      </aside>

      {/* --- Menu Preview --- */}
      <main className="w-3/4 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Vista Previa del Menú</h1>
        <div
          ref={menuPreviewRef}
          className={`relative w-full max-w-2xl mx-auto p-12 shadow-lg min-h-[70vh] transition-colors ${font}`}
          style={{ backgroundColor: backgroundColor, color: textColor }}
        >
          {logo && <Logo {...logo} onUpdate={updateLogoState} onDoubleClick={() => openModal({ type: 'logo', ...logo })} />}
          {menuElements.length === 0 && !logo ? (<p className="text-center opacity-50">Añade elementos para crear tu menú.</p>) : (<div className="space-y-4">{menuElements.map(element => <div key={element.id}>{renderElement(element)}</div>)}</div>)}
        </div>
      </main>

      <Modal isOpen={!!editingElement} onClose={closeModal} title={`Editando: ${editingElement?.type}`}>
        {editingElement?.type === 'logo' && (
          <LogoEditForm
            initialAltText={editingElement.altText}
            onSave={handleSaveLogo}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}