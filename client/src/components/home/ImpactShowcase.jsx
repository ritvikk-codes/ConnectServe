import React, { useState } from 'react';
import {
  Users,
  Clock,
  HeartHandshake,
  Globe,
  Award,
  Share2,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ImpactShowcase = ({ communityImpact, currentUser, onShareImpact }) => {
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    setShared(true);
    toast.success('🎉 Impact shared to your community feed as a celebration post!');
    if (onShareImpact) {
      onShareImpact({
        content: `Celebrated another milestone! Logged ${currentUser?.volunteerHours || 38} hours across 4 community causes with ConnectServe 🌱 Proud to give back to our local neighborhood.`,
        tags: ['MyImpact', 'CommunityFirst'],
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Community-Wide Numbers */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Collective Action
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Community Impact So Far
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real outcomes created when neighbors, students, and organizations come together.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-center space-y-1">
            <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {communityImpact.totalVolunteers.toLocaleString()}+
            </h3>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">People Participating</p>
            <p className="text-[10px] text-slate-400">Across local cities</p>
          </div>

          <div className="p-5 rounded-2xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/60 text-center space-y-1">
            <Clock className="w-6 h-6 text-sky-600 dark:text-sky-400 mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {communityImpact.volunteerHours.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Volunteer Hours</p>
            <p className="text-[10px] text-slate-400">Verified & logged</p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-800/60 text-center space-y-1">
            <HeartHandshake className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {communityImpact.communityActivities.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Community Activities</p>
            <p className="text-[10px] text-slate-400">Cleanups & drives</p>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 text-center space-y-1">
            <Globe className="w-6 h-6 text-rose-600 dark:text-rose-400 mx-auto" />
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {communityImpact.peopleReached.toLocaleString()}
            </h3>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">People Reached</p>
            <p className="text-[10px] text-slate-400">Direct assistance</p>
          </div>
        </div>
      </div>

      {/* User's Own Impact (Section 29: Extension of social identity) */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-emerald-700/50 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Award className="w-3.5 h-3.5" />
            <span>Your Personal Impact Card</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black">
            {currentUser?.name || 'Ritvik Verma'}’s Social Footprint
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every minute you dedicate to local causes builds your community standing, unlocks verifiable achievements, and fuels grassroots progress.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[10px] text-slate-300 uppercase font-semibold">Service Hours</span>
              <p className="text-xl font-black text-emerald-400">{currentUser?.volunteerHours || 38} hrs</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[10px] text-slate-300 uppercase font-semibold">Activities</span>
              <p className="text-xl font-black text-white">{currentUser?.activitiesCount || 12}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[10px] text-slate-300 uppercase font-semibold">Causes Supported</span>
              <p className="text-xl font-black text-teal-300">{currentUser?.causesCount || 4}</p>
            </div>
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[10px] text-slate-300 uppercase font-semibold">Impact Score</span>
              <p className="text-xl font-black text-amber-300">{currentUser?.impactScore || 742}</p>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col gap-3">
          <button
            onClick={handleShare}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-glow flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share My Impact Post</span>
          </button>
          <p className="text-[11px] text-slate-300 text-center">
            Inspire your followers to volunteer
          </p>
        </div>
      </div>
    </div>
  );
};
