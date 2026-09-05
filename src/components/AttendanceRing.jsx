import React from 'react';

export const AttendanceRing = ({ percentage = 78, threshold = 80 }) => {
  const radius = 68;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const isLow = percentage < threshold;
  const ringColor = isLow ? 'var(--status-cancelled-text)' : 'var(--status-inclass-text)';

  return (
    <div className="attendance-ring-container">
      <div className="svg-ring-wrapper">
        <svg width="170" height="170" viewBox="0 0 170 170">
          <circle
            cx="85"
            cy="85"
            r={radius}
            fill="transparent"
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx="85"
            cy="85"
            r={radius}
            fill="transparent"
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%'
            }}
          />
        </svg>
        <div className="ring-center-content">
          <span className="ring-percentage" style={{ color: ringColor }}>
            {percentage}%
          </span>
          <span className="ring-label">Overall</span>
        </div>
      </div>
    </div>
  );
};
