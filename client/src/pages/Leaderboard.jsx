import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { Avatar } from '../components/common/Avatar';
import { AchievementBadge } from '../components/common/Badge';
import { Trophy, Medal, Crown, Clock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const Leaderboard = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [timeframe, setTimeframe] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await userService.getLeaderboard(timeframe);
      if (res.success && res.data) {
        setVolunteers(res.data.volunteers || []);
      }
    } catch (err) {
      toast.error('Failed to load leaderboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const topThree = volunteers.slice(0, 3);
  const remaining = volunteers.slice(3);

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Top Impact Honor Roll</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Community Service Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Celebrating top dedicated volunteers ranked by verified hours contributed to global causes.
        </p>

        {/* Timeframe Filter */}
        <div className="flex justify-center gap-2 pt-2">
          {['all', 'monthly', 'weekly'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] ${
                timeframe === tf
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tf === 'all' ? 'All Time' : tf === 'monthly' ? 'This Month' : 'This Week'}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium (Visual Showcase) */}
      {volunteers.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-8 pb-4">
          {/* 2nd Place */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-card text-center space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-sm flex items-center justify-center mx-auto -mt-8 sm:-mt-10 border-2 border-white dark:border-slate-900 shadow">
              2
            </div>
            <Avatar src={topThree[1].avatar} size="lg" className="mx-auto" />
            <div>
              <Link
                to={`/profile/${topThree[1].username || topThree[1]._id}`}
                className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-emerald-600 truncate block"
              >
                {topThree[1].name}
              </Link>
              <p className="text-[10px] text-slate-400">@{topThree[1].username}</p>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-extrabold">
              <Clock className="w-3.5 h-3.5" />
              {topThree[1].volunteerHours} hrs
            </div>
          </div>

          {/* 1st Place (Crown) */}
          <div className="bg-gradient-to-b from-yellow-50 to-white dark:from-yellow-950/40 dark:to-slate-900 rounded-3xl p-5 sm:p-8 border-2 border-yellow-400 dark:border-yellow-600 shadow-xl text-center space-y-3 relative -translate-y-4">
            <div className="w-10 h-10 rounded-full bg-yellow-400 text-slate-950 font-black text-base flex items-center justify-center mx-auto -mt-10 sm:-mt-14 border-4 border-white dark:border-slate-900 shadow-lg">
              <Crown className="w-5 h-5 fill-slate-950" />
            </div>
            <Avatar src={topThree[0].avatar} size="xl" className="mx-auto ring-4 ring-yellow-400" />
            <div>
              <Link
                to={`/profile/${topThree[0].username || topThree[0]._id}`}
                className="font-black text-sm sm:text-base text-slate-900 dark:text-white hover:text-emerald-600 truncate block"
              >
                {topThree[0].name}
              </Link>
              <p className="text-xs text-slate-400">@{topThree[0].username}</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-yellow-400 text-slate-950 text-xs sm:text-sm font-black shadow-md">
              <Clock className="w-4 h-4" />
              {topThree[0].volunteerHours} hrs
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-card text-center space-y-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-600 text-white font-black text-sm flex items-center justify-center mx-auto -mt-8 sm:-mt-10 border-2 border-white dark:border-slate-900 shadow">
              3
            </div>
            <Avatar src={topThree[2].avatar} size="lg" className="mx-auto" />
            <div>
              <Link
                to={`/profile/${topThree[2].username || topThree[2]._id}`}
                className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-emerald-600 truncate block"
              >
                {topThree[2].name}
              </Link>
              <p className="text-[10px] text-slate-400">@{topThree[2].username}</p>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-extrabold">
              <Clock className="w-3.5 h-3.5" />
              {topThree[2].volunteerHours} hrs
            </div>
          </div>
        </div>
      )}

      {/* Complete Rankings List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-card space-y-3">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
          Rankings Roster
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {volunteers.map((vol) => (
            <div
              key={vol._id}
              className="py-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 px-2 rounded-2xl transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="font-black text-xs text-slate-400 w-6 text-center">
                  #{vol.rank}
                </span>
                <Avatar src={vol.avatar} size="md" />
                <div className="min-w-0">
                  <Link
                    to={`/profile/${vol.username || vol._id}`}
                    className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-emerald-600 truncate block"
                  >
                    {vol.name}
                  </Link>
                  <p className="text-[11px] text-slate-400 truncate">
                    {vol.location || 'Community Volunteer'}
                  </p>
                </div>
              </div>

              {/* Badges preview & hours */}
              <div className="flex items-center gap-4 flex-shrink-0">
                {vol.badges && vol.badges.length > 0 && (
                  <div className="hidden sm:block">
                    <AchievementBadge badge={vol.badges[vol.badges.length - 1]} size="sm" />
                  </div>
                )}
                <div className="text-right">
                  <span className="font-black text-sm text-emerald-600 dark:text-emerald-400 block">
                    {vol.volunteerHours || 0} hrs
                  </span>
                  <span className="text-[10px] text-slate-400">Total Logged</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
