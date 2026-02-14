import React from 'react';
import { History, Languages, LogOut } from 'lucide-react';
import { ViewMode } from '../../utils/constants';

const ProfileView = ({ user, sessions = [], setView, handleLogout }) => {
  if (!user) return null;

  return (
    <div className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto py-6 md:py-10">
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-200 shadow-lg text-center">
        <div className="inline-block p-1.5 bg-linear-to-br from-blue-500 via-indigo-500 to-indigo-600 rounded-full mb-6 md:mb-8 shadow-lg">
          <div className="
            w-24 md:w-32 h-24 md:h-32 
            bg-white rounded-full 
            flex items-center justify-center text-4xl md:text-6xl 
            shadow-inner 
            ring-4 ring-white/90 ring-offset-2 ring-offset-white/50
          ">
            {user.avatar || '👤'}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold font-serif mb-2">
          {user.username || user.name}
        </h2>

        <p className="text-gray-500 text-xs md:text-sm font-semibold uppercase tracking-wide mb-8 md:mb-10">
          Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-5 mb-8 md:mb-10">
          <div className="p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-blue-600 mb-3 flex justify-center"><History size={24} className="md:w-7 md:h-7" /></div>
            <div className="text-2xl md:text-3xl font-bold">{sessions.length}</div>
            <div className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide mt-1">
              Consultations
            </div>
          </div>
          <div className="p-4 md:p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-indigo-600 mb-3 flex justify-center"><Languages size={24} className="md:w-7 md:h-7" /></div>
            <div className="text-2xl md:text-3xl font-bold overflow-hidden text-ellipsis whitespace-nowrap">{user.preferredLanguage || 'English'}</div>
            <div className="text-xs md:text-sm text-gray-600 font-semibold uppercase tracking-wide mt-1">
              Language
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <button
            onClick={() => setView(ViewMode.HISTORY)}
            className="
              w-full p-3 md:p-4 bg-blue-600 text-white rounded-2xl font-semibold text-sm
              shadow-sm hover:bg-blue-700 transition-colors 
              flex items-center justify-center gap-2 md:gap-3
            "
          >
            <History size={18} className="md:w-5 md:h-5" /> View History
          </button>
          <button
            onClick={handleLogout}
            className="
              w-full p-3 md:p-4 bg-red-50 text-red-700 rounded-2xl font-semibold text-sm
              hover:bg-red-100 transition-colors 
              flex items-center justify-center gap-2 md:gap-3
            "
          >
            <LogOut size={18} className="md:w-5 md:h-5" /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;