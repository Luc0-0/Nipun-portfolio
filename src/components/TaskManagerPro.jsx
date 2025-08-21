/** @jsxImportSource react */
import React from 'react';

const TaskManagerPro = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Task Manager Pro</h2>
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        {/* Live Demo */}
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="YOUR_VERCEL_DEPLOYMENT_URL"
            title="Task Manager Pro Live Demo"
            className="w-full h-full border-0"
            allowFullScreen
          ></iframe>
        </div>

        <div className="p-6">
          {/* Description */}
          <p className="text-gray-300 mb-6">
            A full-stack task management application with user authentication and real-time updates. (Add a more detailed description here)
          </p>
          {/* Code Snippets Section (Optional) */}
          {/* Add code snippets or highlight key parts of the code here */}
          <a href="https://github.com/Luc0-0/Task-manager-pro" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">View Code on GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerPro;