'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/placeholder-comic.jpg");
  const [generatedImageDescription, setGeneratedImageDescription] = useState("");

  const generateComic = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
      });
      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
        setGeneratedImageDescription(data.description);
      }
    } catch (error) {
      console.error("Failed to generate comic:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadComic = () => {
    if (imageUrl && imageUrl !== "/placeholder-comic.jpg") {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'totoro_comic.png';
      link.click();
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
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <div className="flex flex-col items-center">
            <div className="mt-4 w-full max-w-xl mb-4">
              <button
                onClick={generateComic}
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? "Generating..." : "Generate Comic"}
              </button>
            </div>

            <div className="w-full max-w-xl">
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-indigo-500"></div>
                </div>
              ) : (
                <div className="text-center">
                  {imageUrl !== "/placeholder-comic.jpg" && (
                    <div className="mt-4">
                      <Image
                        src={imageUrl}
                        alt="Generated Totoro Comic"
                        width={500}
                        height={500}
                        className="mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {imageUrl !== "/placeholder-comic.jpg" && (
              <>
                <div className="mt-4 w-full max-w-xl">
                  <div className="bg-white dark:bg-slate-800 shadow-md rounded-lg p-4 mx-auto">
                    <p className="text-3xl font-['Comic_Sans_MS'] font-bold text-purple-600 dark:text-purple-300 text-center leading-relaxed tracking-wide">
                      {generatedImageDescription}
                    </p>
                  </div>
                </div>

                <div className="mt-4 w-full max-w-xl">
                  <button
                    onClick={downloadComic}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Download Comic
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-800 shadow-md mt-16 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Totoro Comics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
