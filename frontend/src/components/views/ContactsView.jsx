import React from 'react';
import { PhoneCall } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../../utils/constants';

const ContactsView = () => {
  return (
    <div className="animate-in slide-in-from-right duration-500">
      <h2 className="text-4xl font-bold serif mb-8">Emergency Legal Help</h2>
      <p className="text-gray-600 mb-10 max-w-3xl leading-relaxed">
        Access critical legal aid resources and emergency hotlines provided by the Government of India.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EMERGENCY_CONTACTS.map((contact, i) => (
          <div
            key={i}
            className="bg-white p-7 rounded-3xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 bg-${contact.color}-50 text-${contact.color}-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <contact.icon size={28} />
              </div>
              <a
                href={`tel:${contact.number}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
              >
                <PhoneCall size={16} /> Call Now
              </a>
            </div>

            <h3 className="text-xl font-bold serif mb-2">{contact.name}</h3>
            <div className="text-2xl font-bold text-blue-700 mb-3 tracking-tight">{contact.number}</div>
            <p className="text-gray-600 text-sm leading-relaxed mt-auto">{contact.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsView;