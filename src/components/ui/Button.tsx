import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-lg transition-all";
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 shadow-primary hover:shadow-primary-hover",
    ghost: "bg-transparent hover:bg-white/10 text-white"
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
