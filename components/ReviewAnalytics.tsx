
import React, { useState, useEffect, useMemo } from 'react';
import { geminiService } from '../services/geminiService';
import { TopicTrend } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SOLE_REVIEWS = [
  "My feet felt icy cold even after a 5-mile run in the sun!",
  "The phase change material in the heel is a game changer for heat dissipation.",
  "Slightly bulky, but the active cooling is worth the extra weight.",
  "Sweat management is incredible, feet stay dry all day.",
  "The cooling effect faded after 4 hours of heavy hiking.",
  "Best investment for summer athletes. My soles feel like they are on ice.",
  "Material is a bit stiff near the arch, but the thermal performance is 10/10.",
  "I noticed a small hum from the active fan module in the left sole.",
  "Remarkable moisture wicking. No more swamp-foot during marathons.",
  "Could you make a version that fits better in narrow cycling shoes?"
];

const ReviewAnalytics: React.FC = () => {
  const [trends, setTrends] = useState<TopicTrend[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'table' | 'chart'>('chart');

  const dates = useMemo(() => {
    const list = [];
    const today = new Date();
    for (let i = 14; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      list.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return list;
  }, []);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const mappings = await geminiService.analyzeThermalFeedback(SOLE_REVIEWS);
      const uniqueTopics = Array.from(new Set(mappings.map((m: any) => m.topicName))) as string[];
      
      const newTrends: TopicTrend[] = uniqueTopics.map(topic => {
        const counts: Record<string, number> = {};
        dates.forEach(date => {
          counts[date] = Math.floor(Math.random() * 20) + 5;
        });
        const tDate = dates[dates.length - 1];
        counts[tDate] = mappings.filter((m: any) => m.topicName === topic).length * 10;
        return { topic, counts };
      });

      setTrends(newTrends);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { runAnalysis(); }, []);

  const chartData = useMemo(() => {
    return dates.map(date => {
      const entry: any = { date };
      trends.forEach(t => { entry[t.topic] = t.counts[date] || 0; });
      return entry;
    });
  }, [dates, trends]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <i className="fas fa-snowflake text-cyan-400"></i> Thermal Performance Sentiment
          </h2>
          <p className="text-slate-400">Monitoring real-world AetherSole™ feedback cycles.</p>
        </div>
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button onClick={() => setActiveTab('table')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'table' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>Data Grid</button>
          <button onClick={() => setActiveTab('chart')} className={`px-4 py-2 rounded-lg transition ${activeTab === 'chart' ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}>Visual Trends</button>
        </div>
      </div>

      <div className="bg-[#0f172a] border border-cyan-500/20 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-cyan-400 font-mono tracking-widest uppercase text-xs">Calibrating Thermal Data...</p>
            </div>
          </div>
        ) : (
          <div className="h-[400px]">
            {activeTab === 'chart' ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#22d3ee' }} />
                  <Legend iconType="circle" />
                  {trends.map((t, i) => (
                    <Line key={t.topic} type="monotone" dataKey={t.topic} stroke={['#22d3ee', '#38bdf8', '#818cf8', '#2dd4bf', '#f472b6'][i % 5]} strokeWidth={3} dot={false} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="overflow-auto max-h-full">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-slate-500 uppercase border-b border-slate-800">
                      <th className="pb-4">Core Performance Metric</th>
                      <th className="pb-4">Current Pulse</th>
                      <th className="pb-4">Trend Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {trends.map(t => (
                      <tr key={t.topic} className="hover:bg-cyan-500/5 transition">
                        <td className="py-4 font-semibold text-slate-200">{t.topic}</td>
                        <td className="py-4 text-cyan-400">{t.counts[dates[dates.length - 1]]} Mentions</td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded border border-emerald-500/20">Optimal</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewAnalytics;
