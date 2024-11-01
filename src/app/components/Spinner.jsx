import React from 'react';

const Spinner = ({ size = 'md', color = 'blue' }) => {
  // Size mappings
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Color mappings
  const colorMap = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    gray: 'border-gray-500'
  };

  const spinnerSize = sizeMap[size] || sizeMap.md;
  const spinnerColor = colorMap[color] || colorMap.blue;

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${spinnerSize} border-4 border-t-transparent rounded-full animate-spin ${spinnerColor}`}
        role="status"
        aria-label="loading"
      />
    </div>
  );
};

export default Spinner;