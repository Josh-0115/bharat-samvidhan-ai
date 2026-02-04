import React from 'react';
import { X } from 'lucide-react';
import { LANGUAGES } from '../../utils/constants';

const LanguageSelector = ({ language, setLanguage, setShowLangDropdown }) => {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-gray-950/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl p-10 border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex justify-between items-center mb-8">
          <h4 className="text-2xl font-bold serif">Response Accent</h4>
          <button onClick={() => setShowLangDropdown(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"><X/></button>
        </div>
        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 scrollbar-hide">
          {LANGUAGES.map(lang => (
            <button
              key={lang}
              onClick={() => { setLanguage(lang); setShowLangDropdown(false); }}
              className={`p-4 rounded-2xl text-sm font-bold border transition-all ${language === lang ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-transparent hover:border-blue-200'}`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;