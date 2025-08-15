// Minimal test App
import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          Nipun Sujesh
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Frontend & AI Developer
        </p>
        <button className="px-8 py-4 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
          Test Button
        </button>
      </div>
    </div>
  );
}