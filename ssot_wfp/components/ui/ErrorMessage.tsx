
interface ErrorMessageProps {
    message: string
    onRetry?: () => void
  }
  
  export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-800">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Try again
          </button>
        )}
      </div>
    )
  }