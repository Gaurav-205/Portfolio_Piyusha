import { SmoothCursorDemo } from "@/components/ui/magic-cursor";

export default function CursorDemo() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Smooth Cursor Demo</h1>
        
        <div className="text-center mb-8">
          <SmoothCursorDemo />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Interactive Elements</h2>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer">
                Hover Button
              </button>
              <a href="#" className="block w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-center cursor-pointer">
                Link Element
              </a>
              <input 
                type="text" 
                placeholder="Type here to see text cursor"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              />
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4">Magic Cursor Features</h2>
            <div className="space-y-3 text-sm">
              <p>• <strong>Rotation:</strong> Cursor rotates based on movement direction</p>
              <p>• <strong>Scaling:</strong> Slightly scales down during movement</p>
              <p>• <strong>Physics:</strong> Smooth spring-based animations</p>
              <p>• <strong>Arrow Design:</strong> Black arrow with white stroke and shadow</p>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-300">Move your mouse around to see the magic cursor rotate and follow your movements!</p>
          <a 
            href="/" 
            className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer"
          >
            Back to Portfolio
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}