import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ServiceOpportunitiesSection = ({ opportunities, onOpportunityJoined }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [joinedMap, setJoinedMap] = useState({
    'opp_2': true,
  });
  const [countsMap, setCountsMap] = useState({});

  const categories = [
    'All',
    'Environment',
    'Education',
    'Healthcare',
    'Animals',
    'Food',
    'Elderly',
    'Disaster Relief',
    'Community',
  ];

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesCategory = selectedCategory === 'All' || opp.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleJoin = (opp) => {
    const isJoined = !!joinedMap[opp.id];
    const newStatus = !isJoined;
    setJoinedMap(prev => ({ ...prev, [opp.id]: newStatus }));

    const currentCount = countsMap[opp.id] || opp.participantsCount;
    setCountsMap(prev => ({
      ...prev,
      [opp.id]: newStatus ? currentCount + 1 : Math.max(0, currentCount - 1),
    }));

    if (newStatus) {
      toast.success(`You're in! 🎉 Spot confirmed for ${opp.title}`, {
        duration: 3500,
        icon: '🌱',
      });
      if (onOpportunityJoined) onOpportunityJoined(opp);
    } else {
      toast(`Registration cancelled for ${opp.title}`);
    }
  };

  return (
    <section id="opportunities-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Real-World Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Community Service Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Turn social intentions into action. Filter weekend volunteer projects and log verified community service hours.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search drives or causes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all min-h-[40px] flex items-center gap-1.5 ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-glow'
                : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Grid of 10+ Opportunities */}
      {filteredOpportunities.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 space-y-2">
          <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200">No opportunities found matching your filters</h4>
          <p className="text-xs text-slate-500">Try switching categories or resetting your search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => {
            const isJoined = !!joinedMap[opp.id];
            const currentParticipants = countsMap[opp.id] || opp.participantsCount;
            const remainingSpots = Math.max(0, opp.totalSpots - currentParticipants);

            return (
              <div
                key={opp.id}
                className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={opp.coverImage}
                      alt={opp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-slate-950/80 text-emerald-300 backdrop-blur-md border border-white/20">
                      {opp.category}
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">
                      +{opp.hoursGranted} hrs verified
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{opp.organization}</span>
                      {opp.orgVerified && <span className="text-emerald-500 font-bold">✓</span>}
                    </div>

                    <h3 className="font-black text-base text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                      {opp.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {opp.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{opp.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                        <span className="truncate">{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-sky-600 flex-shrink-0" />
                        <span>
                          <strong className="text-slate-800 dark:text-slate-200">{currentParticipants}</strong> volunteers joined ({remainingSpots} spots remaining)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => toggleJoin(opp)}
                    className={`w-full py-2.5 rounded-2xl text-xs font-bold transition-all min-h-[44px] flex items-center justify-center gap-1.5 shadow-sm ${
                      isJoined
                        ? 'bg-emerald-600 text-white shadow-glow'
                        : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-400'
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>You're in! (Going ✓)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Join Volunteer Opportunity</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
