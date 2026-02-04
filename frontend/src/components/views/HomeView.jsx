import React, { useRef } from 'react';
import { Search, BookOpen, PhoneCall, History, User, ArrowRight } from 'lucide-react';
import { FEATURED_ARTICLES, ViewMode } from '../../utils/constants';

const HomeView = ({ user, language, query, setQuery, handleSearch, setView, setIsLoginModalOpen }) => {
  const textareaRef = useRef(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="bg-linear-to-br from-blue-700 to-indigo-800 rounded-3xl p-10 md:p-16 text-white mb-12 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 serif leading-tight">Upholding<br/>The Supreme Lex</h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-xl">
            {user ? `Greetings, ${user.name}.` : "Welcome, Citizen."} Explore India's Constitution in <strong>{language}</strong>.
          </p>

          <div className="relative max-w-2xl bg-white rounded-2xl shadow-lg p-2 flex items-center">
            <div className="pl-4 pr-2 text-gray-400"><Search size={22} /></div>
            <textarea
              ref={textareaRef}
              rows={1}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSearch(); } }}
              placeholder="Ask anything about the Constitution..."
              className="flex-1 bg-transparent border-none py-3 px-2 text-gray-900 placeholder-gray-400 focus:outline-none text-base resize-none"
            />
            <button
              onClick={() => handleSearch()}
              disabled={!query.trim()}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 ml-2"
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group text-left"
          >
            <div className="p-3 bg-blue-50 text-blue-700 rounded-2xl mb-5 w-fit group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <card.icon size={24} />
            </div>
            <div className="font-bold text-lg mb-1">{card.label}</div>
            <div className="text-xs text-gray-500 font-medium">{card.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeView;