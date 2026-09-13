import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Award,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { MAP_MARKERS } from '../../utils/mockData';

export const ImpactMap = ({ currentCity = 'Jalandhar, Punjab' }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeMarker, setActiveMarker] = useState(MAP_MARKERS[0]);

  const categories = ['All', 'Environment', 'Food', 'Education', 'Healthcare', 'Animals'];

  const filteredMarkers = selectedCategory === 'All'
    ? MAP_MARKERS
    : MAP_MARKERS.filter(m => m.category === selectedCategory);

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Environment': return 'bg-emerald-500 text-white';
      case 'Food': return 'bg-amber-500 text-white';
      case 'Education': return 'bg-sky-500 text-white';
      case 'Healthcare': return 'bg-rose-500 text-white';
      case 'Animals': return 'bg-purple-500 text-white';
      default: return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Local Community Map</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Impact Around You — {currentCity}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover verified drives, relief operations, and volunteer circles happening on your local streets.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Map Canvas Representation */}
      <div className="relative rounded-3xl overflow-hidden min-h-[340px] sm:min-h-[380px] bg-[#0c1427] border border-slate-700/60 p-4 sm:p-6 flex flex-col justify-between">
        {/* Subtle Map Grid lines simulation */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        {/* Top Area Label */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-300 text-xs font-mono">
            📍 Sector Coordinates: 31.326° N, 75.576° E
          </span>
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {filteredMarkers.length} Active Local Drives
          </span>
        </div>

        {/* Simulated Interactive Map Markers */}
        <div className="relative z-10 w-full h-44 sm:h-52 my-auto">
          {filteredMarkers.map((marker, index) => {
            const positions = [
              { top: '25%', left: '20%' },
              { top: '45%', left: '55%' },
              { top: '20%', left: '75%' },
              { top: '70%', left: '35%' },
              { top: '65%', left: '80%' },
            ];
            const pos = positions[index % positions.length];
            const isSelected = activeMarker?.id === marker.id;

            return (
              <div
                key={marker.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => setActiveMarker(marker)}
              >
                <div
                  className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 shadow-xl transition-all duration-200 ${
                    getCategoryColor(marker.category)
                  } ${isSelected ? 'scale-110 ring-4 ring-white/50 shadow-glow' : 'hover:scale-105 opacity-90'}`}
                >
                  <span className="text-sm">
                    {marker.category === 'Environment' ? '🌱' : marker.category === 'Food' ? '🍲' : marker.category === 'Education' ? '📚' : marker.category === 'Healthcare' ? '❤️' : '🐾'}
                  </span>
                  <span className="hidden sm:inline">{marker.name}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Marker Detail Card */}
        {activeMarker && (
          <div className="relative z-10 glass-panel p-4 rounded-2xl border border-white/20 text-slate-900 dark:text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                📍
              </div>
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                  {activeMarker.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-300">
                  {activeMarker.address} • <strong className="text-emerald-600 dark:text-emerald-400">{activeMarker.participants} neighbors joined</strong>
                </p>
              </div>
            </div>

            <a
              href="#opportunities-section"
              className="inline-flex items-center justify-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
            >
              <span>View Activity Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
