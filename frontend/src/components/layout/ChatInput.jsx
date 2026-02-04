import React, { useRef, useEffect } from 'react';
import { Loader2, Send, Languages, RotateCcw } from 'lucide-react';

const ChatInput = ({ 
  query, setQuery, handleSearch, isLoading, language, 
  setShowLangDropdown, showLangDropdown, startNewChat 
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [query]);

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-72 bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 md:p-6 z-50">
      <div className="max-w-4xl mx-auto">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }} 
          className="flex gap-3 items-center bg-gray-50 border border-gray-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400/30 transition-all"
        >
          <textarea 
            ref={textareaRef}
            rows={1}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch(); } }}
            placeholder="Type your constitutional question..."
            className="flex-1 bg-transparent border-none py-2 px-3 text-gray-900 font-medium placeholder-gray-500 resize-none overflow-hidden text-base focus:outline-none"
          />
          <div className="flex items-center gap-2 shrink-0">
            <button 
              type="button" 
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-blue-700 hover:border-blue-300 transition-all shadow-sm flex items-center gap-2"
            >
              <Languages size={20} />
              <span className="text-[10px] font-semibold uppercase hidden sm:inline">{language.slice(0,3)}</span>
            </button>
            <button 
              type="button"
              onClick={startNewChat}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-red-600 hover:border-red-300 transition-all shadow-sm"
            >
              <RotateCcw size={20} />
            </button>
            <button 
              type="submit"
              disabled={isLoading || !query.trim()}
              className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all disabled:opacity-60 shadow-md flex items-center justify-center min-w-11"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;