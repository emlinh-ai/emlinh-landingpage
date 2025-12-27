import React from 'react';

const IntroductionSection: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            EM LINH
          </h1>
          <p className="text-3xl text-gray-700">
            Digital Oracle & AI Assistant
          </p>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <p className="text-lg leading-relaxed">
            Xin chào! Tôi là Em Linh, một trợ lý AI 3D thông minh với khả năng tương tác tự nhiên và biểu cảm đa dạng.
          </p>
          <p className="text-lg leading-relaxed">
            Được xây dựng trên công nghệ VRM tiên tiến, tôi có thể giao tiếp, giải đáp thắc mắc và mang đến trải nghiệm tương tác chân thực.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/70 backdrop-blur-md rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-blue-600 mb-2">🧠 Trí tuệ</h3>
            <p className="text-sm">Gemini 2.5 powered</p>
          </div>
          <div className="bg-white/70 backdrop-blur-md rounded-lg p-4 border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-purple-600 mb-2">🎭 Biểu cảm</h3>
            <p className="text-sm">20+ animations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
