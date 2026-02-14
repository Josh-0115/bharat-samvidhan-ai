import React from 'react';
import { PhoneCall } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const ContactsView = () => {
  // Color mapping for dynamic styling
  const colorMap = {
    blue: { bg: '#EFF6FF', text: '#1E40AF' },
    red: { bg: '#FEE2E2', text: '#DC2626' },
    pink: { bg: '#FCE7F3', text: '#BE185D' },
    orange: { bg: '#FFEDD5', text: '#92400E' },
    indigo: { bg: '#EDE9FE', text: '#4F46E5' },
    slate: { bg: '#F1F5F9', text: '#334155' }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <h2 className="text-3xl md:text-4xl font-bold serif mb-6 md:mb-8">Emergency Legal Help</h2>
      <p className="text-sm md:text-base text-gray-600 mb-8 md:mb-10 max-w-3xl leading-relaxed">
        Access critical legal aid resources and emergency hotlines provided by the Government of India.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {EMERGENCY_CONTACTS.map((contact, i) => (
          <div
            key={i}
            className="bg-white p-5 md:p-7 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-6 gap-3">
              <div 
                className="w-12 md:w-14 h-12 md:h-14 rounded-2xl flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
                style={{ backgroundColor: colorMap[contact.color].bg, color: colorMap[contact.color].text }}
              >
                <contact.icon size={24} className="md:w-7 md:h-7" />
              </div>
              <a
                href={`tel:${contact.number}`}
                className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs md:text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <PhoneCall size={14} className="md:w-4 md:h-4" /> <span className="hidden sm:inline">Call Now</span>
              </a>
            </div>

            <h3 className="text-lg md:text-xl font-bold serif mb-2">{contact.name}</h3>
            <div className="text-xl md:text-2xl font-bold text-blue-700 mb-3 tracking-tight">{contact.number}</div>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed mt-auto">{contact.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsView;