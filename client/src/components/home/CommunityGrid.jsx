import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { Button } from '../common/Button';
import toast from 'react-hot-toast';

export const CommunityGrid = ({ communities, onSelectCommunity }) => {
  const [joinedCommunities, setJoinedCommunities] = useState({
    'comm_eco_jalandhar': true,
    'comm_animal_lovers': true,
    'comm_model_town': true,
  });

  const toggleJoin = (id, name) => {
    const isNowJoined = !joinedCommunities[id];
    setJoinedCommunities(prev => ({ ...prev, [id]: isNowJoined }));
    if (isNowJoined) {
      toast.success(`Joined ${name}! 🎉 You'll see their posts on your feed.`);
    } else {
      toast(`Left ${name}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Local Hubs & Cause Circles
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Communities Active Near You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Join grassroots groups around environment, education, emergency blood donation, and neighborhood care.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((comm) => {
          const isJoined = !!joinedCommunities[comm.id];
          return (
            <div
              key={comm.id}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Community Cover Banner */}
                <div className="relative h-32 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={comm.coverImage}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/70 text-white backdrop-blur-md border border-white/20">
                    {comm.membersDisplay} Members
                  </div>
                </div>

                {/* Community Header & Icon */}
                <div className="p-5 pb-3">
                  <div className="flex items-center gap-3 -mt-9 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-2xl flex-shrink-0">
                      {comm.icon}
                    </div>
                    <div className="min-w-0 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {comm.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-1">
                    {comm.name}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {comm.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate max-w-[200px] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      {comm.recentActivity}
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {comm.serviceProjectsCount} drives
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Join Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => toggleJoin(comm.id, comm.name)}
                  className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-sm ${
                    isJoined
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-400'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Joined Community ✓</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Join Community</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
