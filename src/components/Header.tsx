import { Image } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 py-4 px-6 border-b border-gray-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Image className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">EnhancePix</h1>
            <p className="text-xs text-gray-400">Modern Image Enhancement</p>
          </div>
        </div>
        
        <div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            About
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
