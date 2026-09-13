import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  Send,
  Flag,
  EyeOff,
  VolumeX,
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { VerifiedOrgBadge } from '../common/Badge';
import { ShareModal } from './ShareModal';
import toast from 'react-hot-toast';

export const SocialPostCard = ({ post, onJoinOpportunity, onLikeToggle }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 'c1',
      author: 'Simran Kaur',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      text: 'This is incredible work! Count me in for the next drive.',
      time: '1h ago',
    },
    {
      id: 'c2',
      author: 'Rahul Mehta',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      text: 'Wonderful initiative for our neighborhood!',
      time: '30m ago',
    },
  ]);
  const [newComment, setNewComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [oppJoined, setOppJoined] = useState(post.opportunityData?.isJoined || false);
  const [oppParticipants, setOppParticipants] = useState(post.opportunityData?.participantsCount || 32);

  const handleLike = () => {
    const nextLiked = !isLiked;
    setIsLiked(nextLiked);
    setLikesCount(prev => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    if (nextLiked) {
      toast('❤️ Liked post', { id: 'like-toast', duration: 1500 });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(!isBookmarked ? 'Saved to Bookmarks ✓' : 'Removed from Bookmarks');
  };

  const handleFollowToggle = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    toast.success(next ? `Following ${post.author.name} ✓` : `Unfollowed ${post.author.name}`);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const added = {
      id: `c_${Date.now()}`,
      author: 'Ritvik Verma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      text: newComment.trim(),
      time: 'Just now',
    };
    setComments([added, ...comments]);
    setNewComment('');
    toast.success('Comment published!');
  };

  const handleJoinOpportunity = () => {
    const next = !oppJoined;
    setOppJoined(next);
    setOppParticipants(prev => (next ? prev + 1 : Math.max(0, prev - 1)));
    if (next) {
      toast.success("You're in! 🎉 Spot confirmed for this community service activity.");
      if (onJoinOpportunity) onJoinOpportunity(post.opportunityData);
    } else {
      toast('Left event registration');
    }
  };

  return (
    <article className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft transition-all duration-300 hover:shadow-card">
      {/* Post Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar
            src={post.author.avatar}
            alt={post.author.name}
            size="md"
            className="ring-2 ring-slate-100 dark:ring-slate-800"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                {post.author.name}
              </span>
              {post.author.isVerified && <VerifiedOrgBadge isVerified={true} />}
              {post.author.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {post.author.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                {post.location}
              </span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Follow / Menu Actions */}
        <div className="flex items-center gap-2 relative">
          <button
            onClick={handleFollowToggle}
            className={`text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
              isFollowing
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-600 hover:text-white'
            }`}
          >
            {isFollowing ? 'Following ✓' : '+ Follow'}
          </button>

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="More options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 w-40 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-20 animate-fadeIn">
              <button
                onClick={() => {
                  toast.success('Post hidden from feed');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <EyeOff className="w-3.5 h-3.5" />
                <span>Hide Post</span>
              </button>
              <button
                onClick={() => {
                  toast.success('Muted updates from this author');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>Mute User</span>
              </button>
              <button
                onClick={() => {
                  toast.success('Thank you. Reported to moderators.');
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report Content</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Text Content */}
      <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed mb-3">
        {post.content}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer bg-emerald-50/50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Attached Media Photo */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden max-h-96 w-full mb-3 bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
          <img
            src={post.image}
            alt="Community update"
            className="w-full h-full object-cover max-h-80 hover:scale-[1.01] transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}

      {/* INTEGRATED SERVICE OPPORTUNITY CARD (Section 20 of requirements!) */}
      {post.opportunityData && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-teal-500/10 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-300/40 dark:border-emerald-800/60 mb-3 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                🌱 Community Service Activity
              </span>
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5">
                {post.opportunityData.title}
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-sm">
              +{post.opportunityData.hoursGranted} hrs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>{post.opportunityData.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-sky-600" />
              <span>{oppParticipants} Joined ({post.opportunityData.spotsRemaining} spots left)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleJoinOpportunity}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all min-h-[40px] flex items-center gap-1.5 shadow-sm ${
                oppJoined
                  ? 'bg-emerald-600 text-white shadow-glow'
                  : 'bg-slate-900 text-white hover:bg-emerald-600 dark:bg-white dark:text-slate-900 dark:hover:bg-emerald-400'
              }`}
            >
              {oppJoined ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Going ✓</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Join Drive</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 min-h-[40px]"
            >
              Share with friends
            </button>
          </div>
        </div>
      )}

      {/* CELEBRATION CARD (Section 30: Impact Sharing) */}
      {post.celebrationData && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-emerald-500/15 border border-amber-300/50 dark:border-amber-700/50 mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-amber-500/30">
              🎉
            </div>
            <div>
              <p className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                Completed {post.celebrationData.hours} Verified Hours!
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {post.celebrationData.activityTitle} • Badge: {post.celebrationData.badge}
              </p>
            </div>
          </div>
          <button
            onClick={handleLike}
            className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors"
          >
            Celebrate 👏
          </button>
        </div>
      )}

      {/* Engagement Counter Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 py-2 border-t border-slate-100 dark:border-slate-800/80 mb-1">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            {likesCount} {likesCount === 1 ? 'like' : 'likes'}
          </span>
          <span>•</span>
          <span>{comments.length} comments</span>
        </div>
        <span>{post.sharesCount || 0} shares</span>
      </div>

      {/* Social Action Buttons */}
      <div className="grid grid-cols-4 gap-1 border-t border-slate-100 dark:border-slate-800/80 pt-2">
        <button
          onClick={handleLike}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[42px] ${
            isLiked
              ? 'text-rose-600 bg-rose-50 dark:bg-rose-950/30'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'fill-rose-600 text-rose-600 animate-heart-pop' : ''}`} />
          <span>Like</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[42px] ${
            showComments
              ? 'text-sky-600 bg-sky-50 dark:bg-sky-950/30'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comment</span>
        </button>

        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all min-h-[42px]"
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>

        <button
          onClick={handleBookmark}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all min-h-[42px] ${
            isBookmarked
              ? 'text-amber-600 bg-amber-50 dark:bg-amber-950/30'
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
          <span>Save</span>
        </button>
      </div>

      {/* Expandable Comment Drawer */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-fadeIn">
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Write a supportive comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-2.5 max-h-60 overflow-y-auto no-scrollbar pt-1">
            {comments.map((c) => (
              <div key={c.id} className="flex items-start gap-2.5 text-xs bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl">
                <Avatar src={c.avatar} size="xs" />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{c.author}</span>
                    <span className="text-[10px] text-slate-400">{c.time}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Dialog */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        postUrl={window.location.href}
        postTitle={post.content.slice(0, 50)}
      />
    </article>
  );
};
