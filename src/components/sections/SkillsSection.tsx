import React from 'react';
import { Youtube, MessageCircle, Users } from 'lucide-react';

const SkillsSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">
          Kỹ năng đặc biệt
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 border border-gray-200 shadow-sm hover:bg-white/80 transition">
            <div className="flex items-center gap-4 mb-4">
              <Youtube className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">Livestream YouTube</h3>
            </div>
            <p className="text-gray-600">
              Tự động dẫn livestream, tương tác với bình luận và trả lời câu hỏi của người xem một cách thông minh.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 border border-gray-200 shadow-sm hover:bg-white/80 transition">
            <div className="flex items-center gap-4 mb-4">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-800">Trả lời Facebook</h3>
            </div>
            <p className="text-gray-600">
              Quản lý và trả lời tin nhắn Facebook, hỗ trợ chăm sóc khách hàng 24/7.
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 border border-gray-200 shadow-sm hover:bg-white/80 transition">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-800">Chat trực tiếp</h3>
            </div>
            <p className="text-gray-600">
              Tích hợp chat ngay trên website, hỗ trợ người dùng với thời gian phản hồi dưới 200ms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
