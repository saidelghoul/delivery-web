import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, isLoading, variant = 'primary', ...props }: ButtonProps) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`px-4 py-2 rounded-md font-semibold transition-all disabled:opacity-50 flex justify-center items-center ${variants[variant]}`}
    >
      {isLoading ? (
        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        children
      )}
    </button>
  );
};
