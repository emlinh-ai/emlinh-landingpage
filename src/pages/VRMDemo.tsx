import React, { useState } from 'react';
import { VRMViewerComponent } from '../components/VRMViewer';

export const VRMDemo: React.FC = () => {
  const [vrmUrl, setVrmUrl] = useState<string>('/models/emlinh-v2.vrm');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.vrm')) {
      const url = URL.createObjectURL(file);
      setVrmUrl(url);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVrmUrl(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VRM Character Viewer Demo
          </h1>
          <p className="text-lg text-gray-600">
            Upload a VRM file or enter a URL to view 3D characters
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Load VRM files from local upload or URL</li>
              <li>Interactive 3D viewer with orbit controls</li>
              <li>Realistic lighting and environment</li>
              <li>Built-in animations and expressions</li>
              <li>Lip sync support</li>
              <li>Shadow rendering</li>
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              VRM Model Viewer
            </h2>
            <div className="mb-4">
              <div className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload VRM File:
                  </label>
                  <input
                    type="file"
                    accept=".vrm"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Or enter VRM URL:
                  </label>
                  <input
                    type="text"
                    value={vrmUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/model.vrm"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="text-sm text-green-400 mt-2">
                ✓ Default VRM model loaded automatically
              </div>
            </div>
            <div className="flex justify-center">
              <VRMViewerComponent
                vrmUrl={vrmUrl}
                width={800}
                height={600}
                enableControls={true}
                enableEnvironment={true}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Usage Instructions
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  File Upload
                </h3>
                <p className="text-sm text-gray-600">
                  Click the file input to select a .vrm file from your device.
                  The model will load automatically in the viewer.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  URL Input
                </h3>
                <p className="text-sm text-gray-600">
                  Enter a direct URL to a .vrm file hosted online.
                  The model will load when you press Enter or change focus.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Camera Controls
                </h3>
                <p className="text-sm text-gray-600">
                  Left click + drag to rotate, right click + drag to pan,
                  scroll to zoom in/out.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700 mb-2">
                  Supported Features
                </h3>
                <p className="text-sm text-gray-600">
                  The viewer supports VRM 1.0 format with animations,
                  expressions, and lip sync capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRMDemo;
