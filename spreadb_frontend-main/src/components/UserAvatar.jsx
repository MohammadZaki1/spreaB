import React from 'react';

const UserAvatar = ({ src, name, role, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getBgColor = (role) => {
    switch (role) {
      case 'BRAND':
      case 'Brand Owner':
        return 'bg-gradient-to-br from-blue-500 to-blue-600';
      case 'INFLUENCER':
      case 'Influencer':
        return 'bg-gradient-to-br from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${getBgColor(role)} flex-shrink-0`}>
      {src ? (
        <img 
          src={src} 
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <span className="font-semibold text-white">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;