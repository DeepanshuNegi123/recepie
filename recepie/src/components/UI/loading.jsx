import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex flex-col items-center">
        {/* Crossed Spoon & Knife SVG */}
        <div className="relative w-40 h-40">
          {/* Spoon - rotated left */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full animate-spoon"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Spoon bowl */}
            <ellipse cx="48" cy="20" rx="14" ry="18" fill="#E5E7EB" />
            <ellipse cx="48" cy="18" rx="12" ry="15" fill="#F3F4F6" />
            {/* Spoon handle */}
            <rect x="44" y="35" width="8" height="55" fill="#D1D5DB" rx="4" />
            <ellipse cx="48" cy="88" rx="6" ry="3" fill="#9CA3AF" />
          </svg>
          
          {/* Knife - rotated right */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full animate-knife"
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Knife blade */}
            <path 
              d="M 46 10 L 52 10 L 50 45 L 48 45 Z" 
              fill="#E5E7EB"
            />
            <path 
              d="M 47 10 L 51 10 L 49.5 43 L 48.5 43 Z" 
              fill="#F9FAFB"
            />
            {/* Knife handle */}
            <rect x="44" y="43" width="10" height="47" fill="#8B4513" rx="5" />
            <rect x="45" y="45" width="8" height="43" fill="#A0522D" rx="4" />
            <ellipse cx="49" cy="88" rx="6" ry="3" fill="#654321" />
          </svg>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-orange-400 opacity-20 blur-3xl animate-glow"></div>
        </div>
        
        {/* Text with loading dots */}
        <div className="mt-8 flex items-center gap-2">
          <p className="text-white text-xl font-semibold tracking-wide">
            Cooking up your kitchen
          </p>
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-dot1"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-dot2"></span>
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-dot3"></span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-6 w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-300 animate-progress"></div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes spoon {
            0%, 100% { 
              transform: rotate(-30deg) translateY(0) scale(1);
            }
            50% { 
              transform: rotate(-30deg) translateY(-10px) scale(1.05);
            }
          }
          
          @keyframes knife {
            0%, 100% { 
              transform: rotate(30deg) translateY(0) scale(1);
            }
            50% { 
              transform: rotate(30deg) translateY(-10px) scale(1.05);
            }
          }

          @keyframes glow {
            0%, 100% { 
              opacity: 0.15;
              transform: scale(1);
            }
            50% { 
              opacity: 0.35;
              transform: scale(1.15);
            }
          }

          @keyframes dot {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% { 
              opacity: 1;
              transform: scale(1.2);
            }
          }

          @keyframes progress {
            0% { 
              transform: translateX(-100%);
            }
            100% { 
              transform: translateX(100%);
            }
          }

          .animate-spoon {
            animation: spoon 1.6s ease-in-out infinite;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          }

          .animate-knife {
            animation: knife 1.6s ease-in-out infinite 0.2s;
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
          }

          .animate-glow {
            animation: glow 1.6s ease-in-out infinite;
          }

          .animate-dot1 {
            animation: dot 1.4s ease-in-out infinite;
          }

          .animate-dot2 {
            animation: dot 1.4s ease-in-out infinite 0.2s;
          }

          .animate-dot3 {
            animation: dot 1.4s ease-in-out infinite 0.4s;
          }

          .animate-progress {
            animation: progress 1.8s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default Loading;