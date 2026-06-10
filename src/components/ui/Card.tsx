import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-lg ${onClick ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  );
};
