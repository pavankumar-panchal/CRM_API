import React, { useEffect, useState } from "react";
import api from "../lib/api";

const TopProgressBar = () => {
  const [percent, setPercent] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval = null;

    const handleAuthClear = () => {
      setActive(false);
      setPercent(0);
    };

    const storageHandler = (e) => {
      if (!e || e.key === 'jwt_token') handleAuthClear();
    };

    window.addEventListener('storage', storageHandler);
    window.addEventListener('logout', handleAuthClear);

    const fetchProgress = async () => {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        // not authenticated locally: hide progress
        handleAuthClear();
        return;
      }
      try {
        const data = await api.get('/includes/progress.php');
        if (
          data &&
          typeof data.percent === 'number' &&
          data.total > 0 &&
          data.percent < 100
        ) {
          setPercent(data.percent);
          setActive(true);
        } else {
          setActive(false);
          setPercent(0);
        }
      } catch {
        handleAuthClear();
      }
    };

    fetchProgress();
    interval = setInterval(fetchProgress, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', storageHandler);
      window.removeEventListener('logout', handleAuthClear);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="relative w-full h-1.5 bg-gray-300 overflow-hidden shadow">
        {/* Progress bar fills the window */}
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all duration-700 ease-in-out flex items-center"
          style={{ width: `${percent}%` }}
        >
          {/* % label inside the bar, moving with the bar */}
          <span
            className="absolute right-0 mr-2 text-[8.5px] font-bold text-white bg-opacity-90 px-1 py-0.5 rounded-full shadow"
            style={{
              transform: 'translateY(-50%)',
              top: '50%',
              whiteSpace: 'nowrap'
            }}
          >
            {percent.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopProgressBar;
