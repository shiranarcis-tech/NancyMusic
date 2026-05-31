import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ icon, className = '', ...props }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <input 
        className={`w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-primary ${icon ? 'pl-10' : ''}`}
        {...props} 
      />
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center justify-center">
          {icon}
        </span>
      )}
    </div>
  );
};
