import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Squircle, Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
}

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }

    const file = acceptedFiles[0];
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image file size must be less than 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onImageUpload(reader.result as string);
    };
    reader.onerror = () => {
      setError('Failed to read the file');
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1
  });

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Upload Your Image</h2>
      <p className="text-gray-400 mb-8">
        Upload an image to enhance its quality and resolution
      </p>

      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-xl p-12 cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-gray-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <div className="bg-gray-700 p-4 rounded-full mb-4">
            <Upload size={32} className="text-blue-400" />
          </div>
          <p className="text-lg font-medium">
            {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
          </p>
          <p className="text-gray-400 mt-2">or click to browse files</p>
          <p className="text-gray-500 text-sm mt-4">
            Supports JPG, PNG, WebP, GIF (Max 10MB)
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg flex items-center gap-2">
          <Squircle size={18} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
