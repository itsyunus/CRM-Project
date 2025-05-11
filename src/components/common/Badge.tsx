import React from 'react';

interface BadgeProps {
  text: string;
  variant: 'success' | 'danger' | 'warning' | 'info' | 'gray' | 'blue' | 'purple';
  icon?: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ text, variant, icon }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variantStyles = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]}`}>
      {icon && <span className="mr-1">{icon}</span>}
      {text}
    </span>
  );
};

export default Badge;