"use client";

import { useState, useRef } from 'react';
import BusinessName from '@/components/menu/BusinessName';
import SectionTitle from '@/components/menu/SectionTitle';
import ProductItem from '@/components/menu/ProductItem';
import Logo from '@/components/menu/Logo';
import Modal from '@/components/common/Modal';
import Title from '@/components/menu/Title';
import Subtitle from '@/components/menu/Subtitle';
import ThankYou from '@/components/menu/ThankYou';
import Separator from '@/components/menu/Separator';
import LogoEditForm from '@/components/edit-forms/LogoEditForm';
import TextEditForm from '@/components/edit-forms/TextEditForm';
import ProductEditForm from '@/components/edit-forms/ProductEditForm';

// --- Type Definitions ---
interface BaseContent { font?: string; color?: string; }
interface BusinessNameContent extends BaseContent { name: string; }
interface SectionTitleContent extends BaseContent { title: string; }
interface ProductContent extends BaseContent { name: string; description: string; price: string; }
interface TitleContent extends BaseContent { text: string; }
interface SubtitleContent extends BaseContent { text: string; }
interface ThankYouContent extends BaseContent { text: string; }

interface MenuElement {
  id: string;
  type: 'businessName' | 'sectionTitle' | 'product' | 'title' | 'subtitle' | 'separator' | 'thankYou';
  content: BusinessNameContent | SectionTitleContent | ProductContent | TitleContent | SubtitleContent | ThankYouContent | {};
}
interface LogoState { src: string; width: number; height: number; x: number; y: number; altText: string; }

declare const html2canvas: any;
declare const jspdf: any;
declare const Rnd: any;

const fontOptions = [
  { value: 'font-sans', label: 'Inter (Sans-serif)' }, { value: 'font-roboto', label: 'Roboto (Sans-serif)' },
  { value: 'font-montserrat', label: 'Montserrat (Sans-serif)' }, { value: 'font-lora', label: 'Lora (Serif)' },
  { value: 'font-oswald', label: 'Oswald (Display)' },
];

export default function EditorPage() {
  const [menuElements, setMenuElements] = useState<MenuElement[]>([]);
  const [logo, setLogo] = useState<LogoState | null>(null);
  const [font, setFont] = useState('font-sans');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#1f2937');
  const [editingElement, setEditingElement] = useState<any>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const menuPreviewRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addElement = (type: MenuElement['type']) => {
    let newElement: MenuElement;
    switch (type) {
      case 'businessName': newElement = { id: crypto.randomUUID(), type, content: { name: 'Nombre del Negocio' } }; break;
      case 'sectionTitle': newElement = { id: crypto.randomUUID(), type, content: { title: 'Nueva Sección' } }; break;
      case 'product': newElement = { id: crypto.randomUUID(), type, content: { name: 'Nuevo Producto', description: 'Descripción...', price: '9.99' } }; break;
      case 'title': newElement = { id: crypto.randomUUID(), type, content: { text: 'Título Principal' } }; break;
      case 'subtitle': newElement = { id: crypto.randomUUID(), type, content: { text: 'Un subtítulo interesante' } }; break;
      case 'separator': newElement = { id: crypto.randomUUID(), type, content: {} }; break;
      case 'thankYou': newElement = { id: crypto.randomUUID(), type, content: { text: '¡Gracias por su visita!' } }; break;
      default: return;
    }
    setMenuElements([...menuElements, newElement]);
  };

  const renderElement = (element: MenuElement) => {
    const handleDoubleClick = () => openModal(element);
    const content = element.content as BaseContent;
    switch (element.type) {
      case 'businessName': return <BusinessName {...(content as BusinessNameContent)} onDoubleClick={handleDoubleClick} />;
      case 'sectionTitle': return <SectionTitle {...(content as SectionTitleContent)} onDoubleClick={handleDoubleClick} />;
      case 'product': return <ProductItem {...(content as ProductContent)} onDoubleClick={handleDoubleClick} />;
      case 'title': return <Title {...(content as TitleContent)} onDoubleClick={handleDoubleClick} />;
      case 'subtitle': return <Subtitle {...(content as SubtitleContent)} onDoubleClick={handleDoubleClick} />;
      case 'separator': return <Separator onDelete={() => setMenuElements(prev => prev.filter(el => el.id !== element.id))} />;
      case 'thankYou': return <ThankYou {...(content as ThankYouContent)} onDoubleClick={handleDoubleClick} />;
      default: return null;
    }
  };

  const handleLogoUploadClick = () => fileInputRef.current?.click();
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogo({ src: e.target?.result as string, width: 150, height: 150, x: 50, y: 50, altText: 'Logo del negocio' });
      reader.readAsDataURL(file);
    }
  };
  const updateLogoState = (newState: Partial<LogoState>) => {
    if (logo) setLogo({ ...logo, ...newState });
  };

  const openModal = (element: any) => setEditingElement(element);
  const closeModal = () => setEditingElement(null);

  const handleSaveLogo = (newAltText: string) => {
    if (logo) updateLogoState({ altText: newAltText });
    closeModal();
  };

  const handleSaveText = (newValues: any) => {
    if (!editingElement) return;
    const { text, font, color } = newValues;
    const newElements = menuElements.map(el => {
      if (el.id === editingElement.id) {
        const newContent = { ...el.content, font, color };
        if (el.type === 'businessName') (newContent as any).name = text;
        else if (el.type === 'sectionTitle') (newContent as any).title = text;
        else (newContent as any).text = text;
        return { ...el, content: newContent };
      }
      return el;
    });
    setMenuElements(newElements);
    closeModal();
  };

  const handleSaveProduct = (newValues: ProductContent) => {
    if (!editingElement) return;
    const newElements = menuElements.map(el => {
      if (el.id === editingElement.id) return { ...el, content: newValues };
      return el;
    });
    setMenuElements(newElements);
    closeModal();
  };

  const handleDeleteElement = () => {
    if (!editingElement) return;
    if (editingElement.type === 'logo') {
      setLogo(null);
    } else {
      setMenuElements(prev => prev.filter(el => el.id !== editingElement.id));
    }
    closeModal();
  };

  const handleExportPDF = () => {
    const menuElement = menuPreviewRef.current;
    if (!menuElement) return;
    html2canvas(menuElement, { scale: 2, useCORS: true, backgroundColor: null }).then((canvas: any) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 font-sans p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <aside className="lg:col-span-1 p-6 glass-panel">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 border-white border-opacity-30">Herramientas</h2>

            <div className="space-y-3">
              <button onClick={handleLogoUploadClick} className="secondary-button">
                {logo ? 'Cambiar Logo' : 'Cargar Logo'}
              </button>
              <input type="file" ref={fileInputRef} onChange={handleLogoFileChange} className="hidden" accept="image/*" />
            </div>

            <div className="relative">
              <button onClick={() => setIsAddMenuOpen(!isAddMenuOpen)} className="premium-button flex justify-between items-center">
                <span>Añadir Elemento</span>
                <svg className={`w-5 h-5 transition-transform ${isAddMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isAddMenuOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200">
                  <ul className="py-1">
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('title'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Título</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('subtitle'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Subtítulo</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('separator'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Separador</a></li>
                    <li className="border-t my-1"></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('businessName'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nombre del Negocio</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('sectionTitle'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sección</a></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('product'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Producto</a></li>
                    <li className="border-t my-1"></li>
                    <li><a href="#" onClick={(e) => { e.preventDefault(); addElement('thankYou'); setIsAddMenuOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Agradecimiento</a></li>
                  </ul>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 border-b pt-4 pb-3 border-white border-opacity-30">Personalización Global</h2>

            <div className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Tipografía Global</label><select value={font} onChange={(e) => setFont(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">{fontOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Color de Fondo del Menú</label><input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-lg"/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Color de Texto Global</label><input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-10 p-1 border border-gray-300 rounded-lg"/></div>
            </div>

            <div className="pt-6">
              <button onClick={handleExportPDF} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Exportar a PDF
              </button>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-2 p-8 bg-white rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vista Previa del Menú</h1>
          <div ref={menuPreviewRef} className={`relative w-full max-w-3xl mx-auto p-12 shadow-inner bg-opacity-50 min-h-[80vh] transition-colors ${font}`} style={{ backgroundColor: backgroundColor, color: textColor }}>
            {logo && <Logo {...logo} onUpdate={updateLogoState} onDoubleClick={() => openModal({ type: 'logo', ...logo })} />}
            {menuElements.length === 0 && !logo ? (<p className="text-center opacity-50">Añade elementos para crear tu menú.</p>) : (<div className="space-y-4">{menuElements.map(element => <div key={element.id}>{renderElement(element)}</div>)}</div>)}
          </div>
        </main>
      </div>

      <Modal isOpen={!!editingElement} onClose={closeModal} title={`Editando: ${editingElement?.type}`}>
        {editingElement?.type === 'logo' && (
          <LogoEditForm initialAltText={editingElement.altText} onSave={handleSaveLogo} onCancel={closeModal} onDelete={handleDeleteElement} />
        )}
        {['title', 'subtitle', 'thankYou', 'businessName', 'sectionTitle'].includes(editingElement?.type) && (
          <TextEditForm
            initialValues={{
              text: (editingElement.content as any).text || (editingElement.content as any).name || (editingElement.content as any).title,
              font: (editingElement.content as BaseContent).font,
              color: (editingElement.content as BaseContent).color,
            }}
            onSave={handleSaveText}
            onCancel={closeModal}
            onDelete={handleDeleteElement}
            fontOptions={fontOptions}
            label={editingElement.type === 'businessName' ? 'Nombre del Negocio' : 'Texto'}
          />
        )}
        {editingElement?.type === 'product' && (
          <ProductEditForm
            initialValues={editingElement.content as ProductContent}
            onSave={handleSaveProduct}
            onCancel={closeModal}
            onDelete={handleDeleteElement}
            fontOptions={fontOptions}
          />
        )}
      </Modal>
    </div>
  );
}