import { CloudFog, Contrast, Droplet, Sparkles, Sun } from 'lucide-react';

interface EnhancementControlsProps {
  adjustments: {
    brightness: number;
    contrast: number;
    saturation: number;
    sharpness: number;
    blur: number;
  };
  setAdjustments: React.Dispatch<React.SetStateAction<{
    brightness: number;
    contrast: number;
    saturation: number;
    sharpness: number;
    blur: number;
  }>>;
}

const EnhancementControls = ({ adjustments, setAdjustments }: EnhancementControlsProps) => {
  const handleChange = (property: keyof typeof adjustments, value: number) => {
    setAdjustments(prev => ({
      ...prev,
      [property]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between mb-2">
          <label className="flex items-center gap-2 text-sm">
            <Sun size={16} className="text-yellow-400" />
            Brightness
          </label>
          <span className="text-gray-400 text-sm">{adjustments.brightness}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="150"
          value={adjustments.brightness}
          onChange={(e) => handleChange('brightness', Number(e.target.value))}
          className="slider"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <label className="flex items-center gap-2 text-sm">
            <Contrast size={16} className="text-blue-400" />
            Contrast
          </label>
          <span className="text-gray-400 text-sm">{adjustments.contrast}%</span>
        </div>
        <input
          type="range"
          min="50"
          max="150"
          value={adjustments.contrast}
          onChange={(e) => handleChange('contrast', Number(e.target.value))}
          className="slider"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <label className="flex items-center gap-2 text-sm">
            <Droplet size={16} className="text-purple-400" />
            Saturation
          </label>
          <span className="text-gray-400 text-sm">{adjustments.saturation}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="200"
          value={adjustments.saturation}
          onChange={(e) => handleChange('saturation', Number(e.target.value))}
          className="slider"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <label className="flex items-center gap-2 text-sm">
            <Sparkles size={16} className="text-amber-400" />
            Sharpness
          </label>
          <span className="text-gray-400 text-sm">{adjustments.sharpness}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={adjustments.sharpness}
          onChange={(e) => handleChange('sharpness', Number(e.target.value))}
          className="slider"
        />
      </div>
      
      <div>
        <div className="flex justify-between mb-2">
          <label className="flex items-center gap-2 text-sm">
            <CloudFog size={16} className="text-gray-400" />
            Blur
          </label>
          <span className="text-gray-400 text-sm">{adjustments.blur}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={adjustments.blur}
          onChange={(e) => handleChange('blur', Number(e.target.value))}
          className="slider"
        />
      </div>
      
      <button
        className="btn btn-outline w-full mt-4"
        onClick={() => setAdjustments({
          brightness: 100,
          contrast: 100,
          saturation: 100,
          sharpness: 0,
          blur: 0,
        })}
      >
        Reset to Default
      </button>
      
      <div className="mt-6 p-3 bg-blue-500/10 rounded-lg text-xs text-blue-300">
        <p className="font-medium mb-1">About AI Enhancement</p>
        <p>
          This is a client-side demo with basic image filters. True AI super-resolution 
          like Real-ESRGAN requires server-side processing.
        </p>
      </div>
    </div>
  );
};

export default EnhancementControls;
