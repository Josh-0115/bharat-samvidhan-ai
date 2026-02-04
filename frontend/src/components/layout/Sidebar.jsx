import React from 'react';
import { 
  Scale, LogIn, Home, BookOpen, 
  PhoneCall, MessageSquare, History, LogOut, ChevronDown, Clock 
} from 'lucide-react';
import { ViewMode } from '../../utils/constants';

const Sidebar = ({ 
  user, setView, view, 
  setIsLoginModalOpen, handleLogout, sessions, loadSession, startNewChat 
}) => {
  return (
    <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 p-6 fixed h-full z-30">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-linear-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg shadow-blue-100">
            <Scale className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold serif leading-none">Bharat<br/><span className="text-blue-600">Samvidhan</span></h1>
        </div>
      </div>

      {user ? (
        <button 
          onClick={() => setView(ViewMode.PROFILE)}
          className="flex items-center gap-4 p-4 mb-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-blue-200 transition-all group"
        >
          <div className="w-12 h-12 flex items-center justify-center text-3xl bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
            {user.avatar}
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-black truncate">{user.name}</div>
            <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Citizen Scholar</div>
          </div>
          <ChevronDown size={16} className="text-gray-300" />
        </button>
      ) : (
        <button 
          onClick={() => setIsLoginModalOpen(true)}
          className="flex items-center gap-4 p-4 mb-8 bg-blue-600 text-white rounded-3xl shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all group active:scale-95"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl">
            <LogIn size={20} />
          </div>
          <div className="flex-1 text-left font-bold text-sm">Sign In / Sign Up</div>
        </button>
      )}

      <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto scrollbar-hide">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Discovery</p>
        {[
          { id: ViewMode.HOME, icon: Home, label: 'Dashboard' },
          { id: ViewMode.EXPLORE, icon: BookOpen, label: 'Article Library' },
          { id: ViewMode.CONTACTS, icon: PhoneCall, label: 'Legal Help' },
          { id: ViewMode.CHAT, icon: MessageSquare, label: 'AI Assistant', action: startNewChat },
          ...(user ? [{ id: ViewMode.HISTORY, icon: History, label: 'Past Chats' }] : [])
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.action) item.action();
              else setView(item.id);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              view === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon size={20} />
            <span className="font-semibold text-sm">{item.label}</span>
          </button>
        ))}

        {user && sessions.length > 0 && (
          <div className="mt-8">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-1">Recent Sessions</p>
            <div className="space-y-1">
              {sessions.slice(0, 5).map(s => (
                <button
                  key={s.id}
                  onClick={() => loadSession(s)}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-600 truncate hover:bg-gray-50 rounded-lg flex items-center gap-2 group"
                >
                  <Clock size={12} className="shrink-0" />
                  <span className="flex-1 truncate">{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {user && (
        <div className="mt-auto pt-6 border-t border-gray-200">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;