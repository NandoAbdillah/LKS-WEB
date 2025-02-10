import { useEffect, useState } from "react";

const Alert = ({ status, message }) => {
  const [progress, setProgress] = useState(100); // Progress dimulai dari 100%

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, 30); // Turunkan progress setiap 30ms agar selesai dalam 3 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`alert ${
        status === "success"
          ? "alert-success"
          : status === "info"
          ? "alert-info"
          : status === "warning"
          ? "alert-warning"
          : status === "danger"
          ? "alert-danger"
          : "alert-primary"
      }  rounded-0 position-fixed w-100 shadow-lg`}
      style={{ zIndex: 9999, height : '5rem', bottom : '-15px' }}
      role="alert"
    >
      <div className="fw-bold fs-5 d-flex align-items-center h-100">
        <span className="me-2">
          {status === "success"
            ? "✅"
            : status === "info"
            ? "ℹ️"
            : status === "warning"
            ? "⚠️"
            : status === "danger"
            ? "❌"
            : "🔔"}
        </span>
        {message}
      </div>

      {/* Progress Bar */}
      <div className="progress position-absolute bottom-0 start-0 w-100" style={{ height: "4px" }}>
        <div
          className="progress-bar bg-dark"
          role="progressbar"
          style={{
            width: `${progress}%`,
            transition: "width 0.03s linear",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Alert;
