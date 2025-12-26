
import React, { useState } from 'react';
import ReviewAnalytics from './components/ReviewAnalytics';
import AetherVisuals from './components/AetherVisuals';
import VideoGuardian from './components/VideoGuardian';
import ModuleExtractor from './components/ModuleExtractor';
import { AppSection } from './types';

/**
 * AetherLabs - Pulse Coding Assignment Main Entry
 * This component handles the high-level orchestration of the thermal intelligence suite.
 * Architecture: Sidebar navigation with dynamic section rendering.
 */
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.THERMAL_ANALYTICS);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0b1221]">
      {/* 
          Sidebar Navigation:
          Uses a frosted glass aesthetic with a midnight navy base.
          Navigation items correspond to the Pulse Assignment modules.
      */}
      <aside className="w-full md:w-80 bg-[#0f172a]/80 backdrop-blur-xl border-r border-cyan-500/10 flex flex-col sticky top-0 h-auto md:h-screen z-50">
        <div className="p-10">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <i className="fas fa-snowflake text-slate-900 text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tighter text-white">PULSE<span className="text-cyan-400">ASSIGNMENT</span></h1>
              <p className="text-[9px] text-cyan-500 font-bold tracking-[0.3em] uppercase">AetherLabs Thermal Suite</p>
            </div>
          </div>

          <nav className="space-y-4">
            {[
              { id: AppSection.THERMAL_ANALYTICS, icon: 'fa-chart-line', label: 'Thermal Feedback' },
              { id: AppSection.ASSET_GEN, icon: 'fa-wand-magic-sparkles', label: 'Visuals Lab' },
              { id: AppSection.EXTRACTION_AGENT, icon: 'fa-dna', label: 'Extraction Agent' },
              { id: AppSection.RD_PIPELINE, icon: 'fa-shield-halved', label: 'R&D Security' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  activeSection === item.id 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/30'
                }`}
              >
                {activeSection === item.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-400"></div>}
                <i className={`fas ${item.icon} text-lg`}></i>
                <span className="font-bold text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer Sidebar Card: Assignment Progress visualization */}
        <div className="mt-auto p-10">
          <div className="p-6 frosted-glass rounded-3xl text-center">
            <p className="text-[10px] text-cyan-500 font-black uppercase tracking-widest mb-1">Audit Score</p>
            <p className="text-2xl font-bold text-white mb-2">98.2%</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
               <div className="bg-cyan-400 h-full w-[98.2%]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 md:p-16 overflow-y-auto">
        <header className="mb-16 flex flex-col md:flex-row justify-between items-end md:items-center gap-8 border-b border-slate-800/50 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-cyan-500/20">
                AetherLabs Deployment
              </span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight">{activeSection}</h1>
          </div>
          
          {/* Telemetry Display */}
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-6 px-8 py-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ambient</p>
                  <p className="text-xl font-mono text-cyan-400">22.4°C</p>
                </div>
                <div className="w-[1px] h-10 bg-slate-800"></div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Latency</p>
                  <p className="text-xl font-mono text-emerald-400">14ms</p>
                </div>
             </div>
          </div>
        </header>

        {/* Section Viewport */}
        <section className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          {activeSection === AppSection.THERMAL_ANALYTICS && <ReviewAnalytics />}
          {activeSection === AppSection.ASSET_GEN && <AetherVisuals />}
          {activeSection === AppSection.EXTRACTION_AGENT && <ModuleExtractor />}
          {activeSection === AppSection.RD_PIPELINE && <VideoGuardian />}
        </section>

        {/* Submission Credits */}
        <footer className="mt-32 pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
               <i className="fas fa-microchip text-cyan-500"></i>
             </div>
             <p className="text-xs text-slate-500 font-medium">Assignment Ref: <span className="text-white font-bold tracking-wider underline decoration-cyan-500/50">PULSE-TECH-2024</span></p>
           </div>
           <div className="flex gap-12">
             <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">AetherSoles Proprietary AI Interface v2.4</span>
           </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
