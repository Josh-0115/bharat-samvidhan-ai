import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CONSTITUTION_PARTS } from '../../utils/constants';

const ExploreView = ({ handleSearch }) => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
      <h2 className="text-4xl font-bold serif mb-10">Constitutional Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CONSTITUTION_PARTS.map(part => (
          <div
            key={part.id}
            onClick={() => handleSearch(undefined, `Tell me about Part ${part.id} (${part.name})`)}
            className="bg-white p-7 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="text-blue-700 font-bold text-3xl mb-1">#{part.id}</div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">Part</div>
            <h3 className="text-xl font-bold serif mb-5 min-h-12 leading-tight group-hover:text-blue-700 transition-colors">
              {part.name}
            </h3>
            <div className="flex items-center justify-between pt-5 border-t border-gray-100 text-sm">
              <span className="text-gray-600 font-medium">Articles {part.articles}</span>
              <div className="w-10 h-10 bg-gray-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ArrowRight size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreView;