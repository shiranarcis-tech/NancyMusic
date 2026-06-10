import React from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: React.FC<AvatarProps> = ({ size = 'md', className = '', alt = "Avatar", ...props }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16"
  };

  return (
    <img 
      alt={alt}
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`} 
      {...props} 
    />
  );
};
