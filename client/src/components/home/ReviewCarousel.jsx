import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, HeartHandshake } from 'lucide-react';
import { Avatar } from '../common/Avatar';

export const ReviewCarousel = ({ reviews }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white rounded-3xl sm:rounded-4xl p-6 sm:p-12 overflow-hidden border border-emerald-800/40 shadow-2xl"
    >
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
          <HeartHandshake className="w-4 h-4" />
          <span>What Our Community Says</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Real Stories From Local Changemakers
        </h2>

        {/* Active Testimonial Card */}
        <div className="min-h-[160px] flex flex-col items-center justify-center space-y-4 px-2 sm:px-6">
          <Quote className="w-8 h-8 text-emerald-400/50 mx-auto" />
          <p className="text-sm sm:text-xl font-medium text-slate-200 leading-relaxed italic">
            "{reviews[activeIndex]?.quote}"
          </p>

          <div className="flex items-center gap-3 pt-2">
            <Avatar src={reviews[activeIndex]?.avatar} size="md" className="ring-2 ring-emerald-400" />
            <div className="text-left">
              <h4 className="font-bold text-sm text-white">
                {reviews[activeIndex]?.author}
              </h4>
              <p className="text-xs text-emerald-400">
                {reviews[activeIndex]?.activity} • {reviews[activeIndex]?.location}
              </p>
            </div>
            <div className="flex text-amber-400 ml-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Navigation Dots and Controls */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === idx ? 'w-8 bg-emerald-400 shadow-glow' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % reviews.length)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Next review"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-400 pt-1">
          *Demonstrative community testimonials reflecting grassroots participation across Punjab.
        </p>
      </div>
    </div>
  );
};
