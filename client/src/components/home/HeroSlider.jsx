import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Users,
  Compass,
  Calendar,
  Award,
} from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSlider = ({ onExploreCommunity, onExploreOpportunities }) => {
  const slides = [
    {
      id: 1,
      badge: '🌍 Connect with your community',
      title: 'Discover What’s Happening Around You',
      highlight: 'Turn Conversations Into Action.',
      description: 'See verified local updates, grassroots initiatives, neighborhood activities, and inspiring stories happening right in your city.',
      primaryCta: 'Explore Community',
      primaryAction: onExploreCommunity || '/feed',
      secondaryCta: 'Find Opportunities',
      secondaryAction: onExploreOpportunities || '/events',
      bgGradient: 'from-emerald-900 via-teal-900 to-slate-950',
      accentColor: 'text-emerald-400',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      badge: '🤝 Join Interest Groups',
      title: 'Find People Who Care About The Same Things',
      highlight: 'Communities Built Around Causes.',
      description: 'Connect with local environmentalists, animal care networks, student tutors, and blood donors working together to make our cities better.',
      primaryCta: 'Explore Communities',
      primaryAction: '/explore',
      secondaryCta: 'Join A Group',
      secondaryAction: '/explore',
      bgGradient: 'from-sky-950 via-slate-900 to-slate-950',
      accentColor: 'text-sky-400',
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      badge: '🌱 Direct Volunteer Service',
      title: 'Turn Online Conversations Into Real-World Action',
      highlight: 'Give a few hours. Change lives.',
      description: 'Sign up for weekend beach cleanups, book reading circles, food distribution drives, and earn recognized digital hours directly in your profile.',
      primaryCta: 'Find Opportunities',
      primaryAction: '/events',
      secondaryCta: 'See Impact Map',
      secondaryAction: '#impact-map',
      bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
      accentColor: 'text-purple-400',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      badge: '🏆 Celebrate & Inspire',
      title: 'Share The Impact You Create With Friends',
      highlight: 'Service Activity → Social Recognition.',
      description: 'Post your volunteering milestones, earn verified certificates, unlock badges, and inspire your circle to join the next community drive.',
      primaryCta: 'Share Your Story',
      primaryAction: '/feed',
      secondaryCta: 'View Leaderboard',
      secondaryAction: '/leaderboard',
      bgGradient: 'from-rose-950 via-slate-900 to-slate-950',
      accentColor: 'text-rose-400',
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&auto=format&fit=crop&q=80',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800 transition-all duration-500"
    >
      <div className={`relative min-h-[460px] sm:min-h-[500px] flex items-center p-6 sm:p-12 lg:p-16 bg-gradient-to-br ${currentSlide.bgGradient} text-white`}>
        {/* Background Image with Ambient Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-35 mix-blend-overlay">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-transform duration-1000 scale-105"
          />
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />

        {/* Content Column */}
        <div className="relative z-10 max-w-2xl space-y-5 animate-fadeIn key={currentSlide.id}">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-300 animate-pulse" />
            <span>{currentSlide.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
            {currentSlide.title}{' '}
            <span className={`block mt-1 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent`}>
              {currentSlide.highlight}
            </span>
          </h1>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-normal max-w-xl">
            {currentSlide.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            {currentSlide.primaryAction.startsWith('#') ? (
              <a href={currentSlide.primaryAction}>
                <Button variant="primary" size="md" icon={Compass} className="rounded-2xl shadow-glow px-6">
                  {currentSlide.primaryCta}
                </Button>
              </a>
            ) : (
              <Link to={currentSlide.primaryAction}>
                <Button variant="primary" size="md" icon={Compass} className="rounded-2xl shadow-glow px-6">
                  {currentSlide.primaryCta}
                </Button>
              </Link>
            )}

            {currentSlide.secondaryAction.startsWith('#') ? (
              <a href={currentSlide.secondaryAction}>
                <Button variant="secondary" size="md" icon={Calendar} className="rounded-2xl bg-white/15 backdrop-blur-md text-white border-white/25 hover:bg-white/25 px-5">
                  {currentSlide.secondaryCta}
                </Button>
              </a>
            ) : (
              <Link to={currentSlide.secondaryAction}>
                <Button variant="secondary" size="md" icon={Calendar} className="rounded-2xl bg-white/15 backdrop-blur-md text-white border-white/25 hover:bg-white/25 px-5">
                  {currentSlide.secondaryCta}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Floating Social Preview Card on Desktop (Section 6 requirement!) */}
        <div className="hidden lg:block absolute right-12 bottom-12 w-80 z-10 animate-float-slow">
          <div className="glass-panel p-4 rounded-2xl border border-white/20 shadow-2xl text-slate-900 dark:text-white space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                🌱 Active Community Event
              </span>
              <span className="text-[10px] text-slate-400">Jalandhar</span>
            </div>
            <p className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
              Tree Plantation Drive — 32 people joined
            </p>
            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-300 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
              <span className="font-medium">Sunday · 8:00 AM</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">18 spots left</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls Bar */}
      <div className="absolute bottom-4 left-6 sm:left-12 flex items-center gap-3 z-20">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === i ? 'w-8 bg-emerald-400 shadow-glow' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 ml-4">
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
            className="p-1.5 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
