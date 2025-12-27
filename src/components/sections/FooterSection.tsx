import React from 'react';

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400">
              © 2024 Mike Trần. All rights reserved.
            </p>
          </div>
          
          {/* Privacy Policy */}
          <div className="flex gap-6">
            <a 
              href="/privacy-policy" 
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms-of-service" 
              className="text-sm text-gray-400 hover:text-white transition"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
