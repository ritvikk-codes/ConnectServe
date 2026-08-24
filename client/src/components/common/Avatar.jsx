import React from 'react';

export const Avatar = ({ src, alt = 'Avatar', size = 'md', className = '', isOrg = false }) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-lg',
    '2xl': 'w-28 h-28 text-2xl',
  };

  const defaultUrl = isOrg
    ? 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=150&auto=format&fit=crop&q=80'
    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

  const avatarSrc = (typeof src === 'object' ? src?.url : src) || defaultUrl;

  return (
    <div
      className={`relative inline-block flex-shrink-0 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 ${sizeClasses[size] || sizeClasses.md} ${className}`}
    >
      <img
        src={avatarSrc}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = defaultUrl;
        }}
      />
    </div>
  );
};
