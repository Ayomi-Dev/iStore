import Spinner from "./Spinner";

type LoadingOverlayProps = {
  show: boolean;
  message?: string;
};

const LoadingOverlay = ({ show, message } : LoadingOverlayProps ) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <Spinner size="lg" />
        {message && (
          <p className="mt-4 text-white text-lg font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
