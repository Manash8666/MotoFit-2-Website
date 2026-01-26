'use client';

import React from 'react';
import {
    ClipboardCheck, Search, Wrench, CheckCircle2,
    Zap, Activity, ShieldCheck, ArrowRight
} from 'lucide-react';

import PrimaryButton from '@/components/ui/buttons/PrimaryButton';
import GlassButton from '@/components/ui/buttons/GlassButton';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/layout/Card';
import { Badge } from '@/components/ui/graphics/Badge';
import { ProgressBar } from '@/components/ui/data/ProgressBar';
import { useBooking } from '@/context/BookingContext';

export default function MotoFitSystem() {
    const { openBooking } = useBooking();
    return (
        <div className="space-y-20 py-24 relative overflow-hidden bg-[#050505] text-white">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            {/* Hero Section */}
            <section className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl space-y-6">
                <Badge variant="orange" glow className="mb-4">OPERATING SYSTEM v2.0</Badge>
                <h1 className="h1 text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]">
                    THE MOTOFIT SYSTEM
                </h1>
                <p className="body-lg text-[#999999] max-w-2xl leading-relaxed">
                    Most garages run on guesswork. We run on <span className="text-white font-medium">Protocol</span>.
                    From <span className="text-[#00d1ff]">Digital Intake</span> to <span className="text-[#ff5e1a]">Dyno Calibration</span>,
                    experience the first intelligent service workflow in Ahmedabad.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <PrimaryButton variant="default" onClick={() => openBooking('MotoFit System')}>BOOK A SERVICE</PrimaryButton>
                    <GlassButton variant="industrial" onClick={() => openBooking('Queue Status Inquiry')}>VIEW LIVE QUEUE</GlassButton>
                </div>
            </section>

            {/* Step 1: Digital Intake */}
            <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 border-t border-[#1a1a1a] pt-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#ff5e1a]">
                        <ClipboardCheck size={32} />
                        <h2 className="h2 text-white">01. Digital Intake</h2>
                    </div>
                    <p className="body-md text-gray-400 max-w-md">
                        No paper scraps. No lost instructions. We create a
                        <span className="text-white"> Digital Job Card</span> the moment you book.
                        Your bike's history, service requirements, and custom requests are locked into our cloud core.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-500 font-mono">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#ff5e1a]" />
                            <span>Instant Booking Confirmation</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#ff5e1a]" />
                            <span>Doorstep Pickup Protocols</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#ff5e1a]" />
                            <span>Inventory Check & Photo Logging</span>
                        </li>
                    </ul>
                </div>

                {/* Visual Artifact: Job Card */}
                <Card variant="glass" className="rotate-1 hover:rotate-0 transition-transform duration-500">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>JOB CARD #8821</CardTitle>
                            <Badge variant="warning">OPEN</Badge>
                        </div>
                        <CardDescription>Customer: Rahul M. | Bike: Triumph Street Triple</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 font-mono text-sm">
                        <div className="bg-[#0a0a0a]/50 p-4 rounded border border-[#333] space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Service Type</span>
                                <span className="text-[#ff5e1a]">Desmo Major Service</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Intake Time</span>
                                <span>10:42 AM</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Pickup Location</span>
                                <span className="text-right">Satellite, Ahmedabad</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Step 2: Diagnostics */}
            <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 border-t border-[#1a1a1a] pt-12 md:flex-row-reverse" dir="rtl">
                {/* Visual Artifact: Diagnostics Interface */}
                <div dir="ltr">
                    <Card variant="border" className="-rotate-1 hover:rotate-0 transition-transform duration-500 border-[#00d1ff]/30">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-[#00d1ff]">SYSTEM SCAN</CardTitle>
                                <Activity size={20} className="text-[#00d1ff] animate-pulse" />
                            </div>
                            <CardDescription>ECU Diagnostics & 40-Point Inspection</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-mono text-gray-400">
                                    <span>Compression Test</span>
                                    <span className="text-green-500">PASS</span>
                                </div>
                                <ProgressBar value={100} color="cyan" variant="gradient" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-mono text-gray-400">
                                    <span>Electrical Grounding</span>
                                    <span className="text-[#ff5e1a]">WARNING</span>
                                </div>
                                <ProgressBar value={65} color="orange" variant="gradient" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-mono text-gray-400">
                                    <span>Fluids Analysis</span>
                                    <span className="text-green-500">PASS</span>
                                </div>
                                <ProgressBar value={92} color="cyan" variant="gradient" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6" dir="ltr">
                    <div className="flex items-center gap-4 text-[#00d1ff]">
                        <Search size={32} />
                        <h2 className="h2 text-white">02. Deep Diagnostics</h2>
                    </div>
                    <p className="body-md text-gray-400 max-w-md">
                        We don't guess. We scan. Before tools touch your bike, we run a
                        <span className="text-white"> 40-point Technical Inspection</span>.
                        Sensors, compression, fluids, and frame integrity—everything is quantified.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-500 font-mono">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00d1ff]" />
                            <span>OBD-II Error Code Mapping</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00d1ff]" />
                            <span>Electrical Load Testing</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#00d1ff]" />
                            <span>Visual Damage Assessment</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Step 3: Execution */}
            <section className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10 border-t border-[#1a1a1a] pt-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-4 text-[#ff5e1a]">
                        <Wrench size={32} />
                        <h2 className="h2 text-white">03. Live Execution</h2>
                    </div>
                    <p className="body-md text-gray-400 max-w-md">
                        Watch the surgery. We provide <span className="text-white">Live Updates</span> as parts are swapped and fluids are drained.
                        Zero hidden costs—every bolt and washer is verified genuine.
                    </p>
                    <ul className="space-y-3 text-sm text-gray-500 font-mono">
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#ff5e1a]" />
                            <span>OEM Genuine Parts Guarantee</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#ff5e1a]" />
                            <span>Torque Wrench Precision Assembly</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#ff5e1a]" />
                            <span>Photo Evidence of Replacement</span>
                        </li>
                    </ul>
                </div>

                {/* Visual Artifact: Live Status */}
                <div className="space-y-4">
                    <Card variant="glass" className="border-l-4 border-l-[#ff5e1a]">
                        <CardContent className="h-full flex items-center gap-4 p-6">
                            <div className="bg-[#ff5e1a]/20 p-3 rounded-full">
                                <Wrench size={24} className="text-[#ff5e1a]" />
                            </div>
                            <div>
                                <p className="text-sm font-mono text-[#ff5e1a] mb-1">STATUS: IN PROGRESS</p>
                                <p className="text-white font-medium">Technician assigned: Vikram S.</p>
                                <p className="text-xs text-gray-500 mt-1">Stage: Valve Clearance Adjustment</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card variant="glass" className="opacity-60">
                        <CardContent className="h-full flex items-center gap-4 p-6">
                            <div className="bg-gray-800 p-3 rounded-full">
                                <ShieldCheck size={24} className="text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-mono text-gray-500 mb-1">PART VERIFIED</p>
                                <p className="text-gray-400 font-medium">Motul 300V 10W40 (4L)</p>
                                <p className="text-xs text-gray-600 mt-1">Batch #9921-A | Seal Intact</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Step 4: Protocol Handoff */}
            <section className="container mx-auto px-4 md:px-8 relative z-10 border-t border-[#1a1a1a] pt-12 pb-12 text-center space-y-8">
                <div className="flex flex-col items-center gap-4">
                    <Badge variant="success" glow>FINAL STAGE</Badge>
                    <h2 className="h2 text-white">04. Precision Handoff</h2>
                    <p className="body-md text-gray-400 max-w-2xl mx-auto">
                        We don't just hand over keys. We hand over reliability.
                        Every bike undergoes a <span className="text-[#00d1ff]">Final Test Ride</span> or Dyno Run before it leaves the workshop.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <Card variant="border" className="hover:border-[#00d1ff] transition-colors">
                        <CardHeader className="text-center">
                            <Zap size={32} className="mx-auto text-[#00d1ff] mb-2" />
                            <CardTitle>Dyno Verified</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-500 text-center">
                            Performance metrics logged and compared to stock.
                        </CardContent>
                    </Card>
                    <Card variant="border" className="hover:border-[#ff5e1a] transition-colors">
                        <CardHeader className="text-center">
                            <ShieldCheck size={32} className="mx-auto text-[#ff5e1a] mb-2" />
                            <CardTitle>Warranty Seal</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-500 text-center">
                            30-day workmanship warranty on all core jobs.
                        </CardContent>
                    </Card>
                    <Card variant="border" className="hover:border-white transition-colors">
                        <CardHeader className="text-center">
                            <ArrowRight size={32} className="mx-auto text-white mb-2" />
                            <CardTitle>Ready to Ride</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-gray-500 text-center">
                            Washed, polished, and full tank (optional).
                        </CardContent>
                    </Card>
                </div>

                <div className="pt-8">
                    <PrimaryButton variant="default" glow onClick={() => openBooking('MotoFit System Analysis')}>INITIATE BOOKING NOW</PrimaryButton>
                </div>
            </section>
        </div>
    );
}
