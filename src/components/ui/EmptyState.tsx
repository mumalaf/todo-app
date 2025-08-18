import React from 'react';
import { BaseComponentProps } from '@/types/common';

interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const EmptyState = React.memo(function EmptyState({
  title,
  description,
  imageSrc,
  imageAlt,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-start py-16 min-h-[200px] ${className}`}>
      <img 
        src={imageSrc} 
        alt={imageAlt}
        className="mb-8 h-32 w-auto"
      />
      <div className="text-center">
        <h3 className="text-gray-700 font-medium mb-2">{title}</h3>
        <p className="text-gray-500 text-sm whitespace-pre-line">
          {description}
        </p>
      </div>
      
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
});

export default EmptyState;