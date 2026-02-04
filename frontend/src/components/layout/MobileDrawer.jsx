import React from 'react';
import { Scale, X, LogIn, Home, BookOpen, PhoneCall, MessageSquare, History, User, LogOut } from 'lucide-react';
import { ViewMode } from '../../utils/constants';

const MobileDrawer = ({ isMenuOpen, setIsMenuOpen, user, view, setView, startNewChat, setIsLoginModalOpen, handleLogout }) => {
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-60 flex flex-col p-8 md:hidden overflow-y-auto animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <Scale className="text-blue-600" size={32} />
          <h2 className="text-2xl font-bold serif">Directory</h2>
        </div>
        <button onClick={() => setIsMenuOpen(false)} className="p-2">
          <X size={32} className="text-gray-700" />
        </button>
      </div>
      
      {user ? (
        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl mb-10 border border-gray-200">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm border border-gray-200">
            {user.avatar}
          </div>
          <div>
            <div className="font-bold text-xl">{user.username || user.name}</div>
            <div className="text-xs text-blue-600 font-semibold uppercase tracking-wider mt-0.5">Citizen Scholar</div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => { setIsLoginModalOpen(true); setIsMenuOpen(false); }}
          className="flex items-center justify-center gap-3 p-5 bg-blue-600 text-white rounded-3xl mb-10 font-semibold shadow-md hover:bg-blue-700 transition-colors w-full"
        >
          <LogIn size={24} /> Sign In / Sign Up
        </button>
      )}

      <nav className="flex flex-col gap-3 mb-10">
        {[
          { id: ViewMode.HOME, icon: Home, label: 'Dashboard' },
          { id: ViewMode.EXPLORE, icon: BookOpen, label: 'Article Library' },
          { id: ViewMode.CONTACTS, icon: PhoneCall, label: 'Legal Help' },
          { id: ViewMode.CHAT, icon: MessageSquare, label: 'Ask AI', action: startNewChat },
          ...(user ? [
            { id: ViewMode.HISTORY, icon: History, label: 'Consultation Log' },
            { id: ViewMode.PROFILE, icon: User, label: 'Profile' },
          ] : [])
        ].map(item => (
          <button 
            key={item.id} 
            onClick={() => { 
              if (item.action) item.action(); 
              else setView(item.id); 
              setIsMenuOpen(false); 
            }}
            className={`flex items-center gap-4 p-5 rounded-3xl font-semibold text-base transition-all ${
              view === item.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <item.icon size={24} />
            {item.label}
          </button>
        ))}
      </nav>

      {user && (
        <div className="mt-auto">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-4 p-5 w-full text-red-600 font-semibold bg-red-50 rounded-3xl border border-red-100 hover:bg-red-100 transition-colors"
          >
            <LogOut size={24} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileDrawer;