'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/placeholder-comic.jpg");

  const generateComic = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
      });
      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      }
    } catch (error) {
      console.error("Failed to generate comic:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-md py-4">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Totoro Comics
          </h1>
          <nav className="space-x-6">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Latest</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Archive</a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">About</a>
          </nav>
        </div>
      </header>

      {/* Title Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 py-12 mb-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-2">Totoro Comics</h1>
          <p className="text-xl text-indigo-100">AI-Generated Comic Adventures</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Comic Navigation */}
        <div className="flex justify-center mb-4">
          <button 
            onClick={generateComic}
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-bold text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating..." : "Generate Comic"}
          </button>
        </div>

        {/* Comic Display */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 mb-8">
          <div className="relative min-h-[600px]">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-md">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            )}
            {imageUrl !== "/placeholder-comic.jpg" && (
              <Image
                src={imageUrl}
                alt="Generated comic"
                width={800}
                height={600}
                className="w-full h-auto rounded-md"
                priority
              />
            )}
          </div>
          {imageUrl !== "/placeholder-comic.jpg" && (
            <>
              <h2 className="text-xl font-bold mt-4 mb-2">Latest Comic</h2>
              <p className="text-gray-600 dark:text-gray-300">Generated on {new Date().toLocaleDateString()}</p>
            </>
          )}
        </div>

        {/* Comic Description/Commentary */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-700 dark:text-gray-200">
            Author&apos;s commentary or comic description goes here. This can be a fun place to share
            thoughts about the creative process or additional context for the story.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 shadow-md mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
              Twitter
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
              Instagram
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
              RSS Feed
            </a>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Comic Title. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
