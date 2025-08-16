import { BaseComponentProps } from '@/types/common';

interface ErrorMessageProps extends BaseComponentProps {
  error: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export default function ErrorMessage({ 
  error, 
  onRetry, 
  showRetry = false,
  className = '' 
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className="text-red-600 text-center mb-4">
        <p className="font-medium">오류가 발생했습니다</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}