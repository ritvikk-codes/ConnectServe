import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { Mail, Lock, Sparkles, User, Building2, Shield, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/feed';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    const result = await login({ email, password });
    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    }
  };

  const handleQuickDemo = async (roleType) => {
    setDemoLoading(roleType);
    const result = await loginAsDemo(roleType);
    setDemoLoading(null);
    if (result.success) {
      if (roleType === 'admin') navigate('/admin');
      else if (roleType === 'ngo') navigate('/org/dashboard');
      else navigate('/feed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Log in to manage community drives, post updates, and track volunteer hours.
          </p>
        </div>

        {/* Demo Quick-Fill Box */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
          <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Instant Demo Quick-Login:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('volunteer')}
              disabled={demoLoading !== null}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors min-h-[44px]"
            >
              <User className="w-4 h-4 text-emerald-600 mb-0.5" />
              <span>Volunteer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('ngo')}
              disabled={demoLoading !== null}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors min-h-[44px]"
            >
              <Building2 className="w-4 h-4 text-blue-600 mb-0.5" />
              <span>NGO Org</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              disabled={demoLoading !== null}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-slate-800 dark:text-slate-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors min-h-[44px]"
            >
              <Shield className="w-4 h-4 text-purple-600 mb-0.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={isLoading}
            icon={ArrowRight}
          >
            Sign In
          </Button>
        </form>

        {/* Footer link */}
        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};
