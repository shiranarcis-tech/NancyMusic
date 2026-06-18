import React, { useState } from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', className = '', alt = "Avatar", src, ...props }) => {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl"
  };

  if (!src || imgError) {
    return (
      <div
        className={`rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
        aria-label={alt}
      >
        <span className={`material-symbols-outlined text-gray-500 dark:text-gray-400 ${iconSizes[size]}`}>
          person
        </span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      src={src}
      onError={() => setImgError(true)}
      className={`rounded-full object-cover flex-shrink-0 ${sizeClasses[size]} ${className}`}
      {...props}
    />
  );
};
