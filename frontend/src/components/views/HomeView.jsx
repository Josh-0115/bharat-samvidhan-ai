import React, { useRef } from 'react';
import { Search, BookOpen, PhoneCall, History, User, ArrowRight } from 'lucide-react';
import { FEATURED_ARTICLES, ViewMode } from '../../utils/constants';

const HomeView = ({ user, language, query, setQuery, handleSearch, setView, setIsLoginModalOpen }) => {
  const textareaRef = useRef(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="bg-linear-to-br from-blue-700 to-indigo-800 rounded-3xl p-6 md:p-10 lg:p-16 text-white mb-8 md:mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 serif leading-tight">Upholding<br/>The Supreme Lex</h2>
          <p className="text-sm md:text-lg lg:text-xl text-blue-100 mb-6 md:mb-10 max-w-xl leading-relaxed">
            {user ? `Greetings, ${user.username || user.name || user.email}.` : "Welcome, Citizen."} Explore India's Constitution in <strong>{language}</strong>.
          </p>

          <div className="relative max-w-2xl bg-white rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
            <div className="pl-3 md:pl-4 pr-2 text-gray-400 shrink-0"><Search size={20} className="md:w-5 md:h-5" /></div>
            <textarea
              ref={textareaRef}
              rows={1}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch(); } }}
              placeholder="Ask anything about the Constitution..."
              className="flex-1 bg-transparent border-none py-3 px-2 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:outline-none resize-none min-h-12"
            />
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="bg-blue-600 text-white px-4 md:px-6 py-3 rounded-xl font-semibold text-xs md:text-sm hover:bg-blue-700 transition-colors disabled:opacity-90 ml-1 md:ml-2 shrink-0"
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { icon: BookOpen, label: 'Constitutional Library', sub: 'Browse all Parts & Articles', onClick: () => setView(ViewMode.EXPLORE) },
          { icon: PhoneCall, label: 'Emergency Help', sub: 'Legal Aid Hotlines', onClick: () => setView(ViewMode.CONTACTS) },
          user
            ? { icon: History, label: 'Chat History', sub: 'Review past consultations', onClick: () => setView(ViewMode.HISTORY) }
            : { icon: User, label: 'Citizen Profile', sub: 'Sign in to save chats', onClick: () => setIsLoginModalOpen(true) },
        ].map((card, i) => (
          <button
            key={i}
            onClick={card.onClick}
            className="bg-white p-4 md:p-6 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group text-left"
          >
            <div className="p-2.5 md:p-3 bg-blue-50 text-blue-700 rounded-2xl mb-4 md:mb-5 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <card.icon size={20} className="md:w-6 md:h-6" />
            </div>
            <div className="font-bold text-base md:text-lg mb-1">{card.label}</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">{card.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeView;