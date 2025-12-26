
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { VideoMetadata } from '../types';

const VideoGuardian: React.FC = () => {
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const newVideo: VideoMetadata = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      status: 'processing',
      progress: 10,
      uploadedAt: new Date().toLocaleTimeString()
    };
    setVideos(prev => [newVideo, ...prev]);

    for (let p = 20; p <= 80; p += 20) {
      await new Promise(r => setTimeout(r, 800));
      setVideos(prev => prev.map(v => v.id === newVideo.id ? { ...v, progress: p } : v));
    }

    try {
      const result = await geminiService.analyzeVideoSensitivity(file.name, "R&D thermal testing footage for Cooling Soles.");
      setVideos(prev => prev.map(v => v.id === newVideo.id ? { 
        ...v, 
        progress: 100, 
        status: result.status as any,
        sensitivityScore: result.score 
      } : v));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="frosted-glass p-12 rounded-[2.5rem] border border-cyan-500/20 shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <i className="fas fa-shield-halved text-9xl text-cyan-400"></i>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h2 className="text-4xl font-black text-white">R&D Thermal Security</h2>
            <p className="text-slate-400 text-lg leading-relaxed">Protecting AetherSoles™ intellectual property. Upload testing footage for real-time leak detection and sensitivity auditing.</p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <span className="px-4 py-2 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-xl border border-cyan-500/20">AES-256 Encryption</span>
              <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/20">Agentic Vision Audit</span>
              <span className="px-4 py-2 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-xl border border-rose-500/20">Proprietary Shield</span>
            </div>
          </div>
          
          <div className="w-full lg:w-auto">
            <label className="flex flex-col items-center justify-center w-72 h-56 border-2 border-dashed border-slate-800 rounded-[2rem] cursor-pointer hover:bg-cyan-500/5 hover:border-cyan-500 transition-all group">
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <i className="fas fa-video text-5xl text-slate-700 group-hover:text-cyan-400 mb-4 transition"></i>
                <p className="text-sm font-bold text-slate-400 group-hover:text-white">Secure Upload</p>
                <p className="text-[10px] text-slate-600 mt-2 uppercase tracking-widest font-black">Thermal MKV/MP4</p>
              </div>
              <input type="file" className="hidden" onChange={handleUpload} accept="video/*" disabled={uploading} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 frosted-glass rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex justify-between items-center">
            <h3 className="font-black text-xs uppercase tracking-widest text-white">Audit Queue</h3>
            <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-full">{videos.length} Files</span>
          </div>
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {videos.length === 0 && <p className="text-center text-slate-600 py-16 text-sm">Waiting for testing data...</p>}
            {videos.map(v => (
              <div key={v.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-cyan-500/30 transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1 overflow-hidden mr-4">
                    <h4 className="text-xs font-bold text-white truncate">{v.name}</h4>
                    <p className="text-[9px] text-slate-500 font-black mt-1 uppercase tracking-tighter">{v.size} • {v.uploadedAt}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    v.status === 'safe' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                    v.status === 'flagged' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-cyan-500/10 text-cyan-400 animate-pulse'
                  }`}>
                    {v.status}
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${
                    v.status === 'flagged' ? 'bg-rose-500' : 'bg-cyan-400'
                  }`} style={{ width: `${v.progress}%` }}></div>
                </div>
                {v.status !== 'processing' && (
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-bold">Audit Score: <span className={v.sensitivityScore && v.sensitivityScore > 70 ? 'text-rose-400' : 'text-cyan-400'}>{v.sensitivityScore}%</span></span>
                    <button className="text-cyan-400 font-black uppercase hover:underline">Log Report</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 frosted-glass rounded-[2rem] p-10 flex flex-col justify-center">
          <div className="aspect-video bg-black rounded-3xl flex items-center justify-center border border-slate-800 group relative overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=1200" alt="Video Placeholder" className="opacity-20 group-hover:scale-110 transition-transform duration-[3s]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="w-20 h-20 bg-cyan-500 text-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition shadow-[0_0_50px_rgba(34,211,238,0.3)]">
                <i className="fas fa-play text-3xl ml-2"></i>
              </div>
              <p className="text-xs font-black text-cyan-400 uppercase tracking-[0.4em]">Proprietary Player 2.0</p>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex items-center gap-6">
               <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 w-[15%] shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
               </div>
               <span className="text-[10px] font-mono text-cyan-400">02:14 / 15:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGuardian;
