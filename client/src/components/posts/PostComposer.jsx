import React, { useState } from 'react';
import {
  Image,
  Video,
  Calendar,
  HeartHandshake,
  BarChart2,
  HelpCircle,
  X,
  Send,
  Sparkles,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import toast from 'react-hot-toast';

export const PostComposer = ({ currentUser, onPublishPost, currentCity = 'Jalandhar, Punjab' }) => {
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('social'); // 'social', 'event', 'poll', 'help'
  const [mediaUrl, setMediaUrl] = useState('');
  const [selectedTag, setSelectedTag] = useState('CleanJalandhar');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pollOptions, setPollOptions] = useState(['Yes, definitely', 'Need more info']);

  const quickTags = ['CleanJalandhar', 'TreePlantation', 'YouthForChange', 'BloodDonation', 'EducationForAll'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Please enter what is happening in your community!');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newPost = {
        id: `post_${Date.now()}`,
        author: {
          name: currentUser?.name || 'Ritvik Verma',
          username: currentUser?.username || 'ritvik',
          avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
          isVerified: false,
          badge: 'Community Builder',
        },
        location: currentCity,
        timestamp: 'Just now',
        content: content.trim(),
        image: mediaUrl || (postType === 'event' ? 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80' : null),
        tags: [selectedTag],
        likesCount: 1,
        commentsCount: 0,
        sharesCount: 0,
        isLiked: true,
        isBookmarked: false,
        postType: postType,
        pollData: postType === 'poll' ? { question: content, options: pollOptions.map(o => ({ label: o, votes: 0 })) } : null,
      };

      if (onPublishPost) {
        onPublishPost(newPost);
      }

      toast.success('🎉 Posted to your community feed!', {
        icon: '🚀',
      });

      setContent('');
      setMediaUrl('');
      setPostType('social');
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-soft transition-all duration-300">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            What's happening in your community?
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-500" />
          <span className="hidden sm:inline">{currentCity}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-start gap-3">
          <Avatar
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
            size="md"
            className="ring-2 ring-emerald-500/30 ring-offset-2 dark:ring-offset-slate-900"
          />
          <div className="flex-1 min-w-0">
            <textarea
              rows={3}
              placeholder={
                postType === 'help'
                  ? 'Ask your local neighbors or community for help, advice, or volunteers...'
                  : postType === 'event'
                  ? 'Describe an upcoming local volunteer drive, timing, and how to join...'
                  : postType === 'poll'
                  ? 'Ask a community question or vote on the next local cause...'
                  : 'Share something with your community (stories, initiatives, local updates)...'
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
            />
          </div>
        </div>

        {/* Media Preview if attached */}
        {mediaUrl && (
          <div className="relative rounded-2xl overflow-hidden max-h-48 border border-slate-200 dark:border-slate-700">
            <img src={mediaUrl} alt="Post attachment" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setMediaUrl('')}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Type Selection Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => {
              setPostType('social');
              setMediaUrl('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1000&auto=format&fit=crop&q=80');
              toast('📷 Sample high-res photo attached!');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
              postType === 'social' && mediaUrl
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Image className="w-4 h-4 text-emerald-600" />
            <span>Photo</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPostType('event');
              if (!content) setContent("We're organizing a community cleanup drive this weekend! Join hands with fellow volunteers 🌿");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
              postType === 'event'
                ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4 text-sky-600" />
            <span>Event</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPostType('help');
              if (!content) setContent("Looking for 5 volunteers to help pack meals this Saturday in Model Town!");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
              postType === 'help'
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>Ask Community</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPostType('poll');
              if (!content) setContent("Which cause should our local group prioritize next month?");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
              postType === 'poll'
                ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-purple-600" />
            <span>Poll</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 flex-shrink-0" />

          {/* Quick Tag Selector */}
          <div className="flex items-center gap-1.5">
            {quickTags.slice(0, 3).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTag(t)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors ${
                  selectedTag === t
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                #{t}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="text-[11px] text-slate-400">
            Posting publicly to <strong className="text-emerald-600 dark:text-emerald-400">#{selectedTag}</strong>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            isLoading={isSubmitting}
            icon={Send}
            className="rounded-2xl shadow-glow px-5"
          >
            Post Update
          </Button>
        </div>
      </form>
    </div>
  );
};
