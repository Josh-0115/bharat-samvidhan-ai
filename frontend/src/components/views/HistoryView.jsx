import React from 'react';
import { MessageSquare, History, Languages, Clock, ArrowRight } from 'lucide-react';

const HistoryView = ({ sessions, loadSession, startNewChat }) => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-bold serif">Consultation Log</h2>
        <button
          onClick={startNewChat}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <MessageSquare size={18} /> New Chat
        </button>
      </div>

      {sessions.length === 0 ? (
        <div className="py-32 text-center bg-white rounded-3xl border border-dashed border-gray-200">
          <History size={64} className="mx-auto text-gray-300 mb-6" />
          <p className="text-gray-500 font-semibold text-sm uppercase tracking-wide">No past conversations found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions.map(session => (
            <div
              key={session._id || session.id}
              onClick={() => loadSession(session)}
              className="bg-white p-7 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5">
                  <Languages size={14} /> {session.language || 'English'}
                </div>
              </div>

              <h3 className="text-xl font-bold serif mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors">
                {session.title || 'Untitled Consultation'}
              </h3>

              <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 text-sm">
                <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                  <Clock size={14} />
                  {new Date(session.updatedAt || session.lastUpdated || Date.now()).toLocaleDateString()}
                </span>
                <span className="text-blue-600 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Resume <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryView;