import React, { useEffect, useState } from "react";
import { Plane, MapPin, Clock, Users } from "lucide-react";
const Loading = ({ isLoad }) => {
  const [loadingText, setLoadingText] = useState("Searching flights...");
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    "Searching flights...",
    "Comparing prices...",
    "Finding best deals...",
    "Almost ready...",
  ];

  useEffect(() => {
    if (!isLoad) return;

    const messageInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, 1500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [isLoad]);

  if (!isLoad) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-purple-200 rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 border border-purple-200 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-40 h-40 border border-purple-200 rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-28 h-28 border border-purple-200 rounded-full"></div>
      </div>

      <div className="text-center space-y-8 px-4">
        <div className="relative">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-64 h-0.5 bg-gradient-to-r from-purple-200 via-purple-400 to-purple-600 transform -translate-y-1/2"></div>

              <div className="relative z-10 animate-pulse">
                <div className="bg-purple-600 p-4 rounded-full shadow-lg animate-bounce">
                  <Plane className="h-8 w-8 text-white transform rotate-45" />
                </div>
              </div>

              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              FlightFinder
            </span>
          </div>
          <p className="text-gray-600">Your journey begins here</p>
        </div>

        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-purple-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-900 animate-pulse">
              {loadingText}
            </p>

            <div className="w-64 mx-auto bg-purple-100 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
          <div className="text-center space-y-2">
            <div className="bg-purple-100 p-3 rounded-full mx-auto w-fit">
              <MapPin className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Global Routes</p>
          </div>
          <div className="text-center space-y-2">
            <div className="bg-purple-100 p-3 rounded-full mx-auto w-fit">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Real-time Updates</p>
          </div>
          <div className="text-center space-y-2">
            <div className="bg-purple-100 p-3 rounded-full mx-auto w-fit">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600">Trusted by Millions</p>
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
