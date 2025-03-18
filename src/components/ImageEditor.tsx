import { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { CircleCheck, Download, RotateCcw } from 'lucide-react';
import EnhancementControls from './EnhancementControls';

interface ImageEditorProps {
  originalImage: string;
  onReset: () => void;
}

interface ImageAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  sharpness: number;
  blur: number;
}

const ImageEditor = ({ originalImage, onReset }: ImageEditorProps) => {
  const [adjustments, setAdjustments] = useState<ImageAdjustments>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sharpness: 0,
    blur: 0,
  });

  const [enhancedImageUrl, setEnhancedImageUrl] = useState<string>(originalImage);
  const [downloadingImage, setDownloadingImage] = useState(false);
  const [enhancementApplied, setEnhancementApplied] = useState(false);

  useEffect(() => {
    // Apply the filter to the image
    const filters = [
      `brightness(${adjustments.brightness}%)`,
      `contrast(${adjustments.contrast}%)`,
      `saturate(${adjustments.saturation}%)`,
      adjustments.sharpness > 0 ? `brightness(95%) contrast(120%)` : '',
      adjustments.blur > 0 ? `blur(${adjustments.blur / 20}px)` : '',
    ].filter(Boolean).join(' ');

    // We create a canvas to apply the filter
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        // First draw the image
        ctx.filter = 'none';
        ctx.drawImage(img, 0, 0);
        
        // For sharpness, we apply our own algorithm (since filter:sharpen() isn't supported)
        if (adjustments.sharpness > 0) {
          // This is a simplified sharpening effect - in real apps you'd use more advanced algorithms
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const strength = adjustments.sharpness / 50;
          
          // Apply some contrast and brightness adjustment to simulate sharpening
          ctx.filter = `contrast(${100 + 20 * strength}%) brightness(${95 + 5 * strength}%)`;
          ctx.drawImage(img, 0, 0);
        }

        // Apply all the filters
        ctx.filter = filters;
        ctx.drawImage(img, 0, 0);
        
        // And set the enhanced image
        setEnhancedImageUrl(canvas.toDataURL('image/jpeg'));
        
        // Flag that enhancements were applied if any adjustment is different from default
        const isDefault = 
          adjustments.brightness === 100 && 
          adjustments.contrast === 100 && 
          adjustments.saturation === 100 && 
          adjustments.sharpness === 0 && 
          adjustments.blur === 0;
        
        setEnhancementApplied(!isDefault);
      }
    };
    
    img.src = originalImage;
  }, [adjustments, originalImage]);

  const downloadImage = () => {
    setDownloadingImage(true);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = enhancedImageUrl;
    link.download = 'enhanced-image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setTimeout(() => {
      setDownloadingImage(false);
    }, 1000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Enhance Your Image</h2>
      <p className="text-gray-400 mb-8">
        Adjust parameters to enhance your image
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="image-preview-container h-[400px] mb-4">
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={originalImage} alt="Original" />}
              itemTwo={<ReactCompareSliderImage src={enhancedImageUrl} alt="Enhanced" />}
              className="h-full w-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button 
              onClick={downloadImage} 
              className="btn btn-primary flex items-center gap-2"
              disabled={downloadingImage}
            >
              {downloadingImage ? 'Downloading...' : 'Download Enhanced Image'}
              <Download size={18} />
            </button>
            
            <button 
              onClick={onReset} 
              className="btn btn-outline flex items-center gap-2"
            >
              Start Over
              <RotateCcw size={18} />
            </button>
          </div>
          
          {enhancementApplied && (
            <div className="mt-4 text-sm flex items-center gap-2 text-green-400">
              <CircleCheck size={16} />
              <span>Image enhancement applied</span>
            </div>
          )}
        </div>
        
        <div className="bg-gray-850 rounded-lg p-4">
          <h3 className="font-medium text-lg mb-4">Enhancement Controls</h3>
          
          <EnhancementControls 
            adjustments={adjustments}
            setAdjustments={setAdjustments}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
