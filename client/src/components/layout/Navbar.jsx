import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { useSocket } from '../../hooks/useSocket';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import {
  Sun,
  Moon,
  Bell,
  MessageSquare,
  Search,
  PlusCircle,
  LogOut,
  User as UserIcon,
  Award,
  Calendar,
  LayoutDashboard,
  Shield,
  Menu,
  Sparkles,
  Compass,
  HeartHandshake,
  Users,
} from 'lucide-react';

export const Navbar = ({ onOpenCreatePost, onToggleMobileSidebar }) => {
  const { user, isAuthenticated, logout, isOrganization, isAdmin } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { unreadNotificationsCount } = useSocket();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Community Feed', path: '/', icon: Sparkles },
    { label: 'Discover', path: '/explore', icon: Compass },
    { label: 'Opportunities', path: '/events', icon: HeartHandshake },
    { label: 'Impact Hall', path: '/leaderboard', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/90 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-6">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 group-hover:scale-105 transition-all">
                <HeartHandshake className="w-6 h-6 stroke-[2.4]" />
              </div>
              <div>
                <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-600 dark:from-emerald-400 dark:via-teal-300 dark:to-sky-400 bg-clip-text text-transparent block leading-tight">
                  ConnectServe
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 hidden sm:block">
                  Social + Community Impact
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shadow-sm border border-emerald-200/60 dark:border-emerald-800/60'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search drives, neighbors, causes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-slate-100 dark:bg-slate-800/90 border border-slate-200/60 dark:border-slate-700/60 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
              />
              <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
            </form>
          </div>

          {/* Right Actions & Auth */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Quick Demo Profile or Active User */}
            <Link
              to="/profile/ritvik"
              className="hidden sm:flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 hover:scale-[1.02] transition-transform"
            >
              <Avatar
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                size="xs"
                className="ring-2 ring-emerald-500"
              />
              <div className="text-left leading-none">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                  {user?.name || 'Ritvik Verma'}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                  38 hrs • Gold 🏆
                </span>
              </div>
            </Link>

            {/* Notifications Alert */}
            <Link
              to="/notifications"
              className="relative p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </Link>

            {/* Post Trigger */}
            <button
              onClick={onOpenCreatePost}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 hover:from-emerald-500 hover:to-sky-500 text-white shadow-glow transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Update</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
