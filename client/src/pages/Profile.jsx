import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import { chatService } from '../services/chatService';
import { Avatar } from '../components/common/Avatar';
import { VerifiedOrgBadge, AchievementBadge, RoleBadge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SocialPostCard } from '../components/posts/SocialPostCard';
import { CertificateCard } from '../components/certificates/CertificateCard';
import { CertificateViewerModal } from '../components/certificates/CertificateViewerModal';
import { CURRENT_USER, DEMO_POSTS, DEMO_COMMUNITIES } from '../utils/mockData';
import {
  MapPin,
  Globe,
  Calendar,
  Clock,
  Award,
  Edit3,
  UserPlus,
  UserCheck,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Share2,
  Heart,
  Grid,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { idOrUsername } = useParams();
  const { user: authUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If viewing default demo profile or ritvik
  const isRitvik = !idOrUsername || idOrUsername === 'ritvik' || idOrUsername === CURRENT_USER.id;
  
  const [profileUser, setProfileUser] = useState(
    isRitvik ? CURRENT_USER : (authUser || CURRENT_USER)
  );
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(profileUser.followersCount || 1240);
  const [activeTab, setActiveTab] = useState('posts'); // 'posts', 'activities', 'communities', 'impact', 'achievements'
  const [selectedCert, setSelectedCert] = useState(null);

  const isOwnProfile = true; // In prototype demo mode

  const handleToggleFollow = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    setFollowersCount(prev => (next ? prev + 1 : Math.max(0, prev - 1)));
    toast.success(next ? `Following ${profileUser.name} ✓` : `Unfollowed ${profileUser.name}`);
  };

  const demoCertificates = [
    {
      _id: 'cert_1',
      certificateCode: 'CS-2026-GRN-8492',
      volunteerName: profileUser.name,
      organizationName: 'Green Punjab Initiative',
      eventName: 'Cantonment Corridor Tree Plantation Drive',
      hours: 5,
      issueDate: '12 September 2026',
      badgeAwarded: 'Earth Guardian',
    },
    {
      _id: 'cert_2',
      certificateCode: 'CS-2026-FOD-3914',
      volunteerName: profileUser.name,
      organizationName: 'Helping Hands Foundation',
      eventName: 'Weekend Food Rescue & Meal Distribution',
      hours: 4,
      issueDate: '28 August 2026',
      badgeAwarded: 'Community Hero',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16 max-w-5xl mx-auto">
      {/* Cover & Avatar Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl sm:rounded-4xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-soft">
        {/* Banner */}
        <div className="h-44 sm:h-64 w-full overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
          <img
            src={profileUser.banner || 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80'}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Profile Info Header */}
        <div className="px-6 sm:px-10 pb-6 sm:pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-4">
            <div className="flex items-end gap-4">
              <Avatar
                src={profileUser.avatar}
                alt={profileUser.name}
                size="2xl"
                className="ring-4 ring-white dark:ring-slate-900 shadow-xl"
              />
              <div className="pb-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
                    {profileUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                    Community Builder
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  @{profileUser.username}
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Link to="/settings/profile">
                <Button variant="secondary" size="sm" icon={Edit3} className="rounded-xl">
                  Edit Profile
                </Button>
              </Link>
              <button
                onClick={handleToggleFollow}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[38px] ${
                  isFollowing
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-300'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isFollowing ? 'Following ✓' : '+ Follow'}
              </button>
              <Link to="/chat">
                <Button variant="outline" size="sm" icon={MessageSquare} className="rounded-xl">
                  Message
                </Button>
              </Link>
            </div>
          </div>

          {/* Bio & Details */}
          <div className="space-y-4 max-w-3xl">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              {profileUser.bio}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {profileUser.location}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined January 2026
              </span>
            </div>

            {/* Social Followers & Impact Counters Bar (Section 15) */}
            <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <div>
                <strong className="font-black text-slate-900 dark:text-white mr-1 text-sm">
                  {followersCount}
                </strong>
                <span className="text-slate-500 font-medium">Followers</span>
              </div>
              <div>
                <strong className="font-black text-slate-900 dark:text-white mr-1 text-sm">
                  {profileUser.followingCount}
                </strong>
                <span className="text-slate-500 font-medium">Following</span>
              </div>
              <div>
                <strong className="font-black text-slate-900 dark:text-white mr-1 text-sm">
                  {profileUser.activitiesCount}
                </strong>
                <span className="text-slate-500 font-medium">Activities</span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-black text-sm ml-auto">
                <Clock className="w-4 h-4" />
                <span>{profileUser.volunteerHours} Volunteer Hours Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs (Section 15: Posts, Photos, Activities, Communities, Impact, Achievements) */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'posts', label: 'Posts' },
          { id: 'activities', label: 'Activities (38)' },
          { id: 'communities', label: 'Communities (3)' },
          { id: 'impact', label: 'Impact & Certificates' },
          { id: 'achievements', label: 'Achievements (5)' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-bold text-xs sm:text-sm rounded-xl transition-all whitespace-nowrap min-h-[42px] ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-glow'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Posts */}
      {activeTab === 'posts' && (
        <div className="space-y-4 max-w-2xl mx-auto">
          {posts.slice(0, 3).map((post) => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Tab: Activities */}
      {activeTab === 'activities' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: 'Tree Plantation Drive', date: 'Sept 2026', hours: 4, org: 'Green Punjab Initiative', status: 'Completed' },
            { title: 'Community Park Cleanup', date: 'Aug 2026', hours: 4, org: 'Green Punjab Initiative', status: 'Completed' },
            { title: 'Food Distribution Weekend', date: 'Aug 2026', hours: 5, org: 'Helping Hands Foundation', status: 'Completed' },
            { title: 'Senior Citizen Tech Support', date: 'July 2026', hours: 3, org: 'Students for Change', status: 'Completed' },
          ].map((act, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                  +{act.hours} hrs verified
                </span>
                <span className="text-xs text-slate-400">{act.date}</span>
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{act.title}</h4>
              <p className="text-xs text-slate-500">{act.org}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Communities */}
      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DEMO_COMMUNITIES.slice(0, 3).map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft space-y-2 text-center">
              <span className="text-3xl">{c.icon}</span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{c.name}</h4>
              <p className="text-xs text-slate-400">{c.membersDisplay} members</p>
              <span className="inline-block text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-1 rounded-lg">
                Member ✓
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Impact & Certificates */}
      {activeTab === 'impact' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-2xl font-black text-emerald-600">38 hrs</p>
              <p className="text-xs font-bold text-slate-500">Service Hours</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-2xl font-black text-sky-600">12</p>
              <p className="text-xs font-bold text-slate-500">Completed Drives</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-2xl font-black text-purple-600">4</p>
              <p className="text-xs font-bold text-slate-500">Causes Supported</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-2xl font-black text-amber-500">742</p>
              <p className="text-xs font-bold text-slate-500">Impact Score</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {demoCertificates.map((cert) => (
              <CertificateCard
                key={cert._id}
                certificate={cert}
                onView={(c) => setSelectedCert(c)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tab: Achievements (Section 31) */}
      {activeTab === 'achievements' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-soft space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            Earned Achievement Badges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profileUser.badges.map((b) => (
              <div key={b.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{b.name}</h4>
                  <p className="text-[11px] text-slate-400">Unlocked {b.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      <CertificateViewerModal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        certificate={selectedCert}
      />
    </div>
  );
};
