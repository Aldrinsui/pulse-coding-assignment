
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const AetherVisuals: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await geminiService.generateProductAsset(prompt);
      setImage(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-[#0f172a] border border-cyan-500/20 p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-white mb-2">AetherVisuals Lab</h2>
        <p className="text-slate-400 mb-6">Synthesize hyper-realistic marketing assets for AetherSoles™ using generative imaging.</p>
        
        <div className="flex gap-4">
          <input 
            type="text" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the environment (e.g. 'Inside a futuristic laboratory with frost on the glass')"
            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-bold px-10 py-4 rounded-2xl transition shadow-lg shadow-cyan-500/20"
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : 'Synthesize'}
          </button>
        </div>
      </div>

      <div className="relative group min-h-[400px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex items-center justify-center">
        {loading ? (
          <div className="text-center">
            <div className="w-16 h-16 border-b-4 border-cyan-400 rounded-full animate-spin mb-4"></div>
            <p className="text-cyan-400 font-mono text-xs uppercase animate-pulse">Generating Thermal Geometry...</p>
          </div>
        ) : image ? (
          <img src={image} alt="Generated Asset" className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000" />
        ) : (
          <div className="text-center p-12">
            <div className="text-slate-700 text-6xl mb-6"><i className="fas fa-mountain-sun"></i></div>
            <p className="text-slate-500 max-w-xs">No assets generated. Enter a prompt to begin the thermal visualization process.</p>
          </div>
        )}
        
        {image && !loading && (
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => { const link = document.createElement('a'); link.href = image; link.download = 'aethersole_asset.png'; link.click(); }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl hover:bg-white/20"
            >
              <i className="fas fa-download mr-2"></i> Export 4K
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
           <p className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">Suggested Prompt</p>
           <p className="text-slate-400 text-sm italic">"Cooling soles on a podium of volcanic rock with frost spreading from the base."</p>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
           <p className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">Suggested Prompt</p>
           <p className="text-slate-400 text-sm italic">"Action shot of a marathon runner's shoe with visible blue thermal vapor trails."</p>
        </div>
        <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
           <p className="text-cyan-400 text-xs font-bold mb-2 uppercase tracking-wider">Suggested Prompt</p>
           <p className="text-slate-400 text-sm italic">"Extreme close-up of the phase-change material honeycomb texture glowing cyan."</p>
        </div>
      </div>
    </div>
  );
};

export default AetherVisuals;
