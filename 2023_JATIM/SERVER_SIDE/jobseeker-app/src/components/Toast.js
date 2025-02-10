import { useEffect, useState } from "react";

export default function Toast({ status, message }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        alert
            ${
              status === "success"
                ? "alert-success"
                : status === "danger"
                ? "alert-danger"
                : status === "warning"
                ? "alert-warning"
                : status === "info"
                ? "alert-info"
                : "alert-primary"
            }
        position-fixed rounded-0 w-100 shadow-lg
            
        `}
      style={{
        zIndex: 9999,
        bottom: "-14px",
        height: "5remm",
      }}
      role="alert"
    >
      <div className="fw-bold fs-5 d-flex align-items-center">{message}</div>

      <div
        className="progress position-absolute bottom-0  start-0 w-100 "
        style={{
          height: "4px",
        }}
      >
        <div className="progress-bar bg-dark" style={{
            width : `${progress}%`,
            transition  : 'width 0.03s linear'
        }}
        role="progressbar"
        ></div>
      </div>
    </div>
  );
}
