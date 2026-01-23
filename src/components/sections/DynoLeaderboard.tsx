'use client';

import { Badge } from '@/components/ui/graphics/Badge';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Trophy, Activity } from 'lucide-react';

const LEADERBOARD = [
    { rank: 1, bike: "Ducati Panigale V4", owner: "Rajiv S.", mods: "Full Akrapovic + Stage 2", gain: "+18 HP", total: "228 HP" },
    { rank: 2, bike: "Kawasaki ZX-10R", owner: "Amit P.", mods: "Woolich Racing Tune", gain: "+12 HP", total: "208 HP" },
    { rank: 3, bike: "Interceptor 650", owner: "Team MotoFit", mods: "Big Bore 865cc", gain: "+24 HP", total: "71 HP" },
    { rank: 4, bike: "KTM Duke 390", owner: "Varun K.", mods: "Powertronic + Air Filter", gain: "+5 HP", total: "49 HP" },
];

export default function DynoLeaderboard() {
    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-y border-[#333]/30">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <Badge variant="orange" className="mb-4" glow>Live Dyno Data</Badge>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-[0.9]">
                            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">Wall of Power</span>
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-[#a0a0a0] font-mono text-sm">CURRENT MONTH RECORD HOLDERS</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Stats Card */}
                    <div className="lg:col-span-1 bg-[#050505] border border-[#333] p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 p-4 opacity-20"><Trophy size={100} /></div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Highest Gain</h3>
                            <p className="text-[#ff5e1a] text-5xl font-black font-mono">+24 HP</p>
                            <p className="text-gray-500 mt-2">Royal Enfield 650 Big Bore</p>
                        </div>
                        <div className="mt-8 pt-8 border-t border-[#333]">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <Activity size={16} className="text-[#ff5e1a]" />
                                <span>Dyno Calibration: Dynojet 250i</span>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="lg:col-span-2 bg-[#1a1a1a]/50 backdrop-blur-sm border border-[#333] rounded-3xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#050505] text-xs font-mono uppercase text-gray-500">
                                    <tr>
                                        <th className="p-6">Rank</th>
                                        <th className="p-6">Machine</th>
                                        <th className="p-6">Configuration</th>
                                        <th className="p-6 text-right">Output</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {LEADERBOARD.map((entry, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="hover:bg-[#ff5e1a]/5 transition-colors group"
                                        >
                                            <td className="p-6 font-black text-xl italic text-[#666] group-hover:text-white">#{entry.rank}</td>
                                            <td className="p-6">
                                                <div className="font-bold text-white text-lg">{entry.bike}</div>
                                                <div className="text-xs text-[#a0a0a0]">{entry.owner}</div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2">
                                                    <Zap size={14} className="text-[#ff5e1a]" />
                                                    <span className="text-sm text-gray-300">{entry.mods}</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="font-mono font-bold text-[#ff5e1a] text-xl">{entry.total}</div>
                                                <div className="text-xs text-green-500 font-mono">{entry.gain}</div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
