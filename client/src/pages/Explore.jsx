import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Search,
  Users,
  Building2,
  Calendar,
  Sparkles,
  TrendingUp,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Avatar } from '../components/common/Avatar';
import { SocialPostCard } from '../components/posts/SocialPostCard';
import {
  DEMO_USERS,
  DEMO_ORGANIZATIONS,
  DEMO_COMMUNITIES,
  DEMO_OPPORTUNITIES,
  DEMO_POSTS,
  TRENDING_TOPICS,
} from '../utils/mockData';
import toast from 'react-hot-toast';

export const Explore = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  const filteredCommunities = DEMO_COMMUNITIES.filter(c =>
    !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOrgs = DEMO_ORGANIZATIONS.filter(o =>
    !searchQuery || o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.mission.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredOpportunities = DEMO_OPPORTUNITIES.filter(o =>
    !searchQuery || o.title.toLowerCase().includes(searchQuery.toLowerCase()) || o.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = DEMO_POSTS.filter(p => {
    if (selectedTag && (!p.tags || !p.tags.includes(selectedTag))) return false;
    if (searchQuery && !p.content.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl space-y-4">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Compass className="w-4 h-4" />
            <span>Discover What’s Happening</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
            Explore Communities, Changemakers & Causes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Uncover trending conversations in Punjab, join interest groups, connect with local leaders, and find high-impact volunteer drives.
          </p>
        </div>

        {/* Global Search Bar (Section 49) */}
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search people, communities, events and causes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-300" />
        </div>
      </div>

      {/* Trending Causes Tags */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 flex-shrink-0">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Trending Topics:
        </span>
        {TRENDING_TOPICS.map((t) => (
          <button
            key={t.tag}
            onClick={() => {
              setSelectedTag(selectedTag === t.tag ? null : t.tag);
              toast(`Filtering by #${t.tag}`);
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors min-h-[38px] flex items-center ${
              selectedTag === t.tag
                ? 'bg-emerald-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-800'
            }`}
          >
            #{t.tag}
          </button>
        ))}
      </div>

      {/* 1. PEOPLE YOU MAY KNOW (Section 12) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            People You May Know
          </h2>
          <span className="text-xs font-bold text-slate-400">Based on your city</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_USERS.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar src={user.avatar} size="md" />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {user.name}
                  </h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold truncate">
                    {user.role}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    {user.location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Connected with ${user.name}! 🎉`)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-all flex-shrink-0"
              >
                + Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. COMMUNITIES YOU MAY LIKE (Section 12) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-600" />
            Communities You May Like
          </h2>
          <Link to="/#communities" className="text-xs font-bold text-emerald-600 hover:underline">
            View All Hubs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCommunities.slice(0, 3).map((comm) => (
            <div
              key={comm.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft flex flex-col justify-between"
            >
              <div>
                <img src={comm.coverImage} alt={comm.name} className="w-full h-28 object-cover" />
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{comm.icon}</span>
                    <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400">
                      {comm.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white line-clamp-1">
                    {comm.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {comm.description}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button
                  onClick={() => toast.success(`Joined ${comm.name}! 🚀`)}
                  className="w-full py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-emerald-600 transition-colors"
                >
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ORGANIZATIONS TO FOLLOW (Section 12) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            Organizations to Follow
          </h2>
          <span className="text-xs font-bold text-slate-400">Verified NGOs</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrgs.map((org) => (
            <div
              key={org.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <Avatar src={org.avatar} size="lg" isOrg={true} />
                <div className="min-w-0 flex-1">
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                    {org.name} {org.verified && '✓'}
                  </h4>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block">
                    {org.category}
                  </span>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {org.mission}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  {org.followersCount} followers
                </span>
                <button
                  onClick={() => toast.success(`Following ${org.name} ✓`)}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                >
                  Follow
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DISCOVER POSTS STREAM (Section 12) */}
      <section className="space-y-4 max-w-3xl mx-auto pt-4">
        <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Recommended Community Posts
        </h2>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};
