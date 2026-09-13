import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  TrendingUp,
  Heart,
  Share2,
  Calendar,
  Users,
  Compass,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { HeroSlider } from '../components/home/HeroSlider';
import { PostComposer } from '../components/posts/PostComposer';
import { SocialPostCard } from '../components/posts/SocialPostCard';
import { CommunityGrid } from '../components/home/CommunityGrid';
import { ImpactMap } from '../components/home/ImpactMap';
import { ServiceOpportunitiesSection } from '../components/home/ServiceOpportunitiesSection';
import { ReviewCarousel } from '../components/home/ReviewCarousel';
import { ImpactShowcase } from '../components/home/ImpactShowcase';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import {
  LOCATIONS,
  CURRENT_USER,
  DEMO_USERS,
  DEMO_ORGANIZATIONS,
  DEMO_COMMUNITIES,
  TRENDING_TOPICS,
  COMMUNITY_NEEDS,
  DEMO_POSTS,
  DEMO_OPPORTUNITIES,
  DEMO_REVIEWS,
  DEMO_COMMUNITY_IMPACT,
} from '../utils/mockData';
import toast from 'react-hot-toast';

export const Home = () => {
  const [selectedCity, setSelectedCity] = useState('Jalandhar, Punjab');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'opportunities', 'discussions', 'needs'
  const [selectedTag, setSelectedTag] = useState(null);

  // Handle publishing a new post right from the composer (adds to top of feed!)
  const handlePublishPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  // Handle joining opportunity from post or section
  const handleOpportunityJoined = (opp) => {
    // Add celebratory activity post to the feed (Section 61 UX Loop!)
    const autoCelebrationPost = {
      id: `post_auto_${Date.now()}`,
      author: {
        name: CURRENT_USER.name,
        username: CURRENT_USER.username,
        avatar: CURRENT_USER.avatar,
        isVerified: false,
        badge: 'Community Builder',
      },
      location: selectedCity,
      timestamp: 'Just now',
      content: `I just registered to participate in "${opp.title}"! Looking forward to working alongside fellow volunteers 🌱`,
      tags: ['Going', 'VolunteerPunjab'],
      likesCount: 3,
      commentsCount: 1,
      sharesCount: 0,
      isLiked: true,
      isBookmarked: false,
      postType: 'social',
    };
    setPosts([autoCelebrationPost, ...posts]);
  };

  // Filter posts based on active tab or trending tag
  const filteredPosts = posts.filter((p) => {
    if (selectedTag && (!p.tags || !p.tags.includes(selectedTag))) {
      return false;
    }
    if (activeTab === 'opportunities') return p.postType === 'opportunity_integrated';
    if (activeTab === 'discussions') return p.postType === 'discussion';
    if (activeTab === 'needs') return p.postType === 'help';
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 animate-fadeIn">
      {/* Location Context Bar (Section 13) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Active Community Hub:
          </span>
          <div className="relative">
            <button
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-extrabold text-slate-900 dark:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showLocationDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-30 animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase">
                  Select Nearby City
                </div>
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedCity(loc);
                      setShowLocationDropdown(false);
                      toast.success(`Switched feed to ${loc} 📍`);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                      selectedCity === loc ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Near You Quick Ticker */}
        <div className="flex items-center gap-4 text-xs text-slate-500 overflow-x-auto no-scrollbar">
          <span className="whitespace-nowrap">
            <strong className="text-slate-900 dark:text-white">18</strong> new posts
          </span>
          <span>•</span>
          <span className="whitespace-nowrap">
            <strong className="text-slate-900 dark:text-white">6</strong> events this weekend
          </span>
          <span>•</span>
          <span className="whitespace-nowrap">
            <strong className="text-emerald-600 dark:text-emerald-400">12</strong> volunteering opportunities
          </span>
        </div>
      </div>

      {/* 1. HERO SLIDER SECTION (Section 6 & 7) */}
      <section>
        <HeroSlider
          onExploreCommunity="#feed-section"
          onExploreOpportunities="#opportunities-section"
        />
      </section>

      {/* 2. TRENDING TOPICS IN YOUR COMMUNITY (Section 14) */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Trending in Your Community ({selectedCity.split(',')[0]})
            </h3>
          </div>
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Clear filter ({selectedTag})
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {TRENDING_TOPICS.map((topic) => (
            <button
              key={topic.tag}
              onClick={() => {
                setSelectedTag(selectedTag === topic.tag ? null : topic.tag);
                toast(`Filtered posts by #${topic.tag}`);
              }}
              className={`p-3 rounded-2xl text-left transition-all border ${
                selectedTag === topic.tag
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-0.5">
                {topic.badge}
              </span>
              <p className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                #{topic.tag}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{topic.postsCount}</p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. MAIN SOCIAL FEED + POST COMPOSER + SIDEBAR (Section 8 & 9) */}
      <section id="feed-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Feed & Composer */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Live Community Feed
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                What’s Happening Around You?
              </h2>
            </div>

            {/* Feed View Switcher */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setActiveTab('opportunities')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  activeTab === 'opportunities'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Drives
              </button>
              <button
                onClick={() => setActiveTab('discussions')}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  activeTab === 'discussions'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                Discussions
              </button>
            </div>
          </div>

          {/* Social Post Composer */}
          <PostComposer
            currentUser={CURRENT_USER}
            onPublishPost={handlePublishPost}
            currentCity={selectedCity}
          />

          {/* Feed Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <SocialPostCard
                key={post.id}
                post={post}
                onJoinOpportunity={handleOpportunityJoined}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Community Needs & Suggested Organizations */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Community Needs / SOS Board (Section 23) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                Community Needs Near You
              </h3>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">
                Active Requests
              </span>
            </div>

            <div className="space-y-3">
              {COMMUNITY_NEEDS.map((need) => (
                <div
                  key={need.id}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors space-y-1.5 border border-slate-100 dark:border-slate-800"
                >
                  <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400">
                    🆘 {need.tags[0]}
                  </span>
                  <p className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    {need.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{need.organization}</span>
                    <button
                      onClick={() => toast.success(`Contacted ${need.organization} to offer help!`)}
                      className="font-bold text-emerald-600 hover:underline"
                    >
                      Offer Help →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Organizations to Follow (Section 26 & 46) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Local Organizations to Follow
            </h3>

            <div className="space-y-3">
              {DEMO_ORGANIZATIONS.slice(0, 4).map((org) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between gap-2.5 p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar src={org.avatar} size="sm" isOrg={true} />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {org.name} {org.verified && '✓'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {org.location} • {org.followersCount} followers
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success(`Following ${org.name} ✓`)}
                    className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white transition-colors flex-shrink-0"
                  >
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* People You May Know */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-soft space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Active Changemakers
            </h3>
            <div className="space-y-2.5">
              {DEMO_USERS.slice(0, 3).map((u) => (
                <div key={u.id} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar src={u.avatar} size="xs" />
                    <div className="min-w-0">
                      <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{u.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{u.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast.success(`Connected with ${u.name}!`)}
                    className="text-xs font-bold text-emerald-600 hover:underline flex-shrink-0"
                  >
                    + Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* 4. COMMUNITIES DIRECTORY SECTION (Section 10 & 11) */}
      <section>
        <CommunityGrid communities={DEMO_COMMUNITIES} />
      </section>

      {/* 5. INTERACTIVE LOCAL IMPACT MAP (Section 34) */}
      <section id="impact-map">
        <ImpactMap currentCity={selectedCity} />
      </section>

      {/* 6. SERVICE OPPORTUNITIES DIRECTORY (Section 21) */}
      <ServiceOpportunitiesSection
        opportunities={DEMO_OPPORTUNITIES}
        onOpportunityJoined={handleOpportunityJoined}
      />

      {/* 7. REVIEWS & TESTIMONIALS (Section 28) */}
      <section>
        <ReviewCarousel reviews={DEMO_REVIEWS} />
      </section>

      {/* 8. IMPACT COUNTERS & PERSONAL IMPACT CARD (Section 29 & 30) */}
      <section>
        <ImpactShowcase
          communityImpact={DEMO_COMMUNITY_IMPACT}
          currentUser={CURRENT_USER}
          onShareImpact={handlePublishPost}
        />
      </section>

      {/* 9. FINAL CALL TO ACTION (Section 37) */}
      <section className="relative rounded-3xl sm:rounded-4xl p-8 sm:p-14 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white text-center shadow-glow space-y-5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.2),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Your Community Is Waiting.
          </h2>
          <p className="text-sm sm:text-base text-emerald-50 max-w-lg mx-auto">
            Connect with people who care, discover local initiatives, and be part of something bigger right on your home street.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a href="#feed-section">
              <Button variant="secondary" size="lg" className="rounded-2xl bg-white text-slate-900 hover:bg-slate-100 px-7 font-extrabold shadow-lg">
                Join ConnectServe
              </Button>
            </a>
            <a href="#opportunities-section">
              <Button variant="outline" size="lg" className="rounded-2xl border-white/40 text-white hover:bg-white/10 px-7 font-extrabold">
                Explore Community
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
