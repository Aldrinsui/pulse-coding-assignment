
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ModuleInfo } from '../types';

/**
 * ModuleExtractor Component
 * Demonstrates hierarchical data extraction from unstructured text.
 * Themed for AetherLabs technical documentation audits.
 */
const ModuleExtractor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ModuleInfo[] | null>(null);

  /**
   * Orchestrates the extraction process.
   * Uses Gemini to map raw text to a structured ModuleInfo array.
   */
  const handleExtract = async () => {
    if (!url) return;
    setLoading(true);
    try {
      // Simulation of content analysis for help center mapping
      const mockContent = `
        AetherSoles Documentation - Alpha Phase:
        1. Thermal Management Core: Covers the active fan and phase change logic.
           - Active Fan PWM: Control logic for the internal ventilation module.
           - Safety Shutoff: Emergency protocols if sole temperature exceeds 45°C.
        2. Power & Logistics: Battery specifications and charging protocols.
           - Wireless Docking: Qi-compatible charging station requirements.
           - Battery Calibration: Maintaining performance across 500 charge cycles.
      `;
      const data = await geminiService.extractModulesFromContent(mockContent);
      setResults(data);
    } catch (error) {
      console.error("Extraction Failure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="frosted-glass p-12 rounded-[2.5rem] border border-cyan-500/20 shadow-xl">
        <h2 className="text-3xl font-black text-white mb-4">Structure Extraction Engine</h2>
        <p className="text-slate-400 mb-8 leading-relaxed">Map unstructured AetherLabs documentation into hierarchical module trees for system integration.</p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Technical Doc URL (e.g. docs.aetherlabs.tech/thermal)"
            className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder:text-slate-700"
          />
          <button 
            onClick={handleExtract}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white font-black px-10 py-4 rounded-2xl transition shadow-lg shadow-cyan-500/20"
          >
            {loading ? <i className="fas fa-spinner fa-spin mr-2"></i> : 'Run Pulse Extract'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="space-y-6">
          <div className="h-24 bg-slate-900/50 animate-pulse rounded-[1.5rem] border border-slate-800/50"></div>
          <div className="h-48 bg-slate-900/50 animate-pulse rounded-[1.5rem] border border-slate-800/50"></div>
        </div>
      )}

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white tracking-tight">Extracted Hierarchy</h3>
            <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500/20">
              {results.length} Logic Clusters
            </span>
          </div>
          
          <div className="grid gap-8">
            {results.map((m, idx) => (
              <div key={idx} className="bg-slate-900/30 border border-slate-800 rounded-[2rem] p-8 hover:border-cyan-500/40 transition-colors group">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <h4 className="text-lg font-black text-cyan-400 mb-1 group-hover:text-white transition-colors uppercase tracking-tight">{m.module}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed max-w-xl">{m.Description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-8 border-l-2 border-slate-800/50">
                  {Object.entries(m.Submodules).map(([name, desc]) => (
                    <div key={name} className="relative group/item">
                      <div className="absolute -left-[34px] top-3 w-4 h-[2px] bg-cyan-500/20 group-hover/item:bg-cyan-500 transition-colors"></div>
                      <h5 className="text-white font-bold text-sm mb-1">{name}</h5>
                      <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950/80 p-8 rounded-[2rem] border border-slate-900 overflow-hidden">
             <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">Structured Telemetry Output (JSON)</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(JSON.stringify(results, null, 2))}
                  className="text-xs font-black text-cyan-400 hover:text-white transition uppercase tracking-widest"
                >
                  <i className="fas fa-copy mr-2"></i> Copy Schema
                </button>
             </div>
             <pre className="text-[11px] font-mono text-cyan-300/60 overflow-x-auto p-6 bg-slate-900/50 rounded-2xl border border-slate-800">
                {JSON.stringify(results, null, 2)}
             </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleExtractor;
