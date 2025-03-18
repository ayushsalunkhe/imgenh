import { useState } from 'react';
import { Download, Image, SlidersVertical, Upload } from 'lucide-react';
import './index.css';
import ImageUploader from './components/ImageUploader';
import ImageEditor from './components/ImageEditor';
import Header from './components/Header';
import Footer from './components/Footer';

export function App() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'enhance'>('upload');

  const handleImageUpload = (imageDataUrl: string) => {
    setOriginalImage(imageDataUrl);
    setActiveTab('enhance');
  };

  const resetApp = () => {
    setOriginalImage(null);
    setActiveTab('upload');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button 
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'upload' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('upload')}
            >
              <Upload size={18} />
              Upload
            </button>
            <button 
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${activeTab === 'enhance' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setActiveTab('enhance')}
              disabled={!originalImage}
            >
              <SlidersVertical size={18} />
              Enhance
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {activeTab === 'upload' ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              originalImage && <ImageEditor originalImage={originalImage} onReset={resetApp} />
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
