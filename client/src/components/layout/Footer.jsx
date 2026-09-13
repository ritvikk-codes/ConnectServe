import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Shield, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 transition-colors mt-auto mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black shadow-md shadow-emerald-500/20">
                CS
              </div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                ConnectServe
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              A modern social network built around local communities, grassroots causes, service events, and positive real-world action.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Connect. Serve. Belong.
              </span>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Explore
            </h5>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li><Link to="/explore" className="hover:text-emerald-600 transition-colors">Discover</Link></li>
              <li><Link to="/#communities" className="hover:text-emerald-600 transition-colors">Communities</Link></li>
              <li><Link to="/events" className="hover:text-emerald-600 transition-colors">Local Events</Link></li>
              <li><Link to="/#opportunities-section" className="hover:text-emerald-600 transition-colors">Opportunities</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Connect
            </h5>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li><Link to="/explore" className="hover:text-emerald-600 transition-colors">People You May Know</Link></li>
              <li><Link to="/explore" className="hover:text-emerald-600 transition-colors">Organizations</Link></li>
              <li><Link to="/feed" className="hover:text-emerald-600 transition-colors">Interest Groups</Link></li>
              <li><Link to="/chat" className="hover:text-emerald-600 transition-colors">Direct Messaging</Link></li>
            </ul>
          </div>

          {/* Impact & Legal */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
              Impact & Trust
            </h5>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li><Link to="/#impact-map" className="hover:text-emerald-600 transition-colors">Activities Map</Link></li>
              <li><Link to="/leaderboard" className="hover:text-emerald-600 transition-colors">Community Impact</Link></li>
              <li><Link to="/certificates" className="hover:text-emerald-600 transition-colors">Digital Certificates</Link></li>
              <li><Link to="/leaderboard" className="hover:text-emerald-600 transition-colors">Achievements</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal & Tagline Bottom */}
        <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ConnectServe. Built for grassroots real-world impact.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Community Guidelines</a>
            <a href="#" className="hover:underline">Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
