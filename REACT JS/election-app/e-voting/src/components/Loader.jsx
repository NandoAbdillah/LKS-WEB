import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Loader() {
  const { progressShow, setProgressShow } = useAuth();
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    if (!progressShow) return;

    const totalTime = 3000;
    const intervalTime = 30;
    const steps = totalTime / intervalTime;
    const increment = 100 / steps;

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += increment;
      // Pastikan progress tidak melebihi 100%
      const newProgress = Math.min(currentProgress, 100);
      setProgressWidth(newProgress);

      // Hentikan loader jika sudah mencapai 100%
      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setProgressShow(false);
      }
    }, intervalTime);

    // Cleanup interval jika komponen di-unmount
    return () => clearInterval(progressInterval);
  }, [progressShow, setProgressShow]);

  if (!progressShow) return null;

  return (
    <div className="progress rounded-0 position-fixed top-0 start-0  w-100 ">
      <div
        className="progress-bar rounded-0 progress-bar-striped progress-bar-animated bg-danger"
        role="progressbar"
        style={{ width: `${progressWidth}%`, transition: "width 0.1s linear" }}
      ></div>
    </div>
  );
}
