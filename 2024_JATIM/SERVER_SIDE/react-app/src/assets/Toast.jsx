import { useState, useEffect } from "react";



const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
      const timer = setTimeout(() => {
          if (onClose) {
              onClose();
          }
      }, duration);

      return () => clearTimeout(timer);
  }, [onClose, duration]);

  const typeClass = {
      success: 'text-bg-success',
      error: 'text-bg-danger',
      info: 'text-bg-info',
  }[type] || 'text-bg-secondary';

  return (
      <div className="toast-container position-fixed bottom-0 left-0 p-3">
          <div
              className={`toast show align-items-center ${typeClass} border-0`}
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
          >
              <div className="d-flex">
                  <div className="toast-body">{message}</div>
                  <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      aria-label="Close"
                      onClick={onClose}
                  ></button>
              </div>
          </div>
      </div>
  );
};

const ToastElement = ({ message, type, duration }) => {
  const [showToast, setShowToast] = useState(true);

  const handleClose = () => {
      setShowToast(false);
  };

  return showToast ? (
      <Toast message={message} type={type} duration={duration} onClose={handleClose} />
  ) : null;
};

export default ToastElement;
