import React from 'react';
import { Code, Mail, Globe } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">
          Liên hệ phát triển
        </h2>
        
        <div className="bg-white/70 backdrop-blur-md rounded-lg p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <Code className="w-12 h-12 text-cyan-400" />
            <h3 className="text-2xl font-semibold text-gray-800">Em Linh Development Team</h3>
          </div>
          
          <p className="text-lg text-gray-600 mb-6">
            Chúng tôi luôn sẵn sàng lắng nghe góp ý và phát triển Em Linh ngày càng thông minh hơn.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">contact@emlinh.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600">www.emlinh.ai</span>
            </div>
          </div>
          
          <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition">
            Gửi tin nhắn cho đội ngũ
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
