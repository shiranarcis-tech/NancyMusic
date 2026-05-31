import React from 'react';

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: string;
  active?: boolean;
}

export const NavLink: React.FC<NavLinkProps> = ({ children, icon, active, className = '', ...props }) => {
  const baseClasses = "flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors p-2 rounded-lg";
  const activeClasses = active ? "bg-gray-200 dark:bg-gray-700 font-semibold" : "font-medium";
  
  return (
    <a className={`${baseClasses} ${activeClasses} ${className}`} {...props}>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </a>
  );
};
