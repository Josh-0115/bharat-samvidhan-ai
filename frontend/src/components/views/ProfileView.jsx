import React from 'react';
import { History, Languages, LogOut } from 'lucide-react';
import { ViewMode } from '../../utils/constants';

const ProfileView = ({ user, sessions = [], setView, handleLogout }) => {
  if (!user) return null;

  return (
    <div className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto py-10">
      <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg text-center">
        <div className="inline-block p-1 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full mb-8 shadow-md">
          <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center text-6xl shadow-inner ring-4 ring-white/80">
            {user.avatar}
          </div>
        </div>

        <h2 className="text-3xl font-bold serif mb-2">{user.username || user.name}</h2>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-10">
          Member since {new Date(user.createdAt || Date.now()).toLocaleDateString()}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-blue-600 mb-3"><History size={28} /></div>
            <div className="text-3xl font-bold">{sessions.length}</div>
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Consultations</div>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200">
            <div className="text-indigo-600 mb-3"><Languages size={28} /></div>
            <div className="text-3xl font-bold">{user.preferredLanguage || 'English'}</div>
            <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Language</div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setView(ViewMode.HISTORY)}
            className="w-full p-4 bg-blue-600 text-white rounded-2xl font-semibold shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
          >
            <History size={20} /> View History
          </button>
          <button
            onClick={handleLogout}
            className="w-full p-4 bg-red-50 text-red-700 rounded-2xl font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-3"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;