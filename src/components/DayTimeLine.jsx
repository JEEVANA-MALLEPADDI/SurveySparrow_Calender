import React, { useMemo } from 'react';
import dayjs from 'dayjs';

const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

const hexToRgba = (hex, alpha = 0.15) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const calculatePositions = (events) => {
  const sorted = [...events].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  const lanes = [];
  const positioned = [];

  sorted.forEach((event) => {
    let placed = false;
    for (let i = 0; i < lanes.length; i++) {
      const lastEventInLane = lanes[i][lanes[i].length - 1];
      if (timeToMinutes(event.startTime) >= timeToMinutes(lastEventInLane.endTime)) {
        lanes[i].push(event);
        positioned.push({ ...event, lane: i, lanesCount: 0 });
        placed = true;
        break;
      }
    }
    if (!placed) {
      lanes.push([event]);
      positioned.push({ ...event, lane: lanes.length - 1, lanesCount: 0 });
    }
  });

  positioned.forEach((event) => {
    const overlaps = positioned.filter((e) => {
      const startA = timeToMinutes(event.startTime);
      const endA = timeToMinutes(event.endTime);
      const startB = timeToMinutes(e.startTime);
      const endB = timeToMinutes(e.endTime);
      return !(endA <= startB || startA >= endB);
    });
    const maxLane = Math.max(...overlaps.map((e) => e.lane));
    event.lanesCount = maxLane + 1;
  });

  return positioned;
};

const DayTimeline = ({ date, events = [], darkMode = false }) => {
  const pxPerHour = 40;
  const timelineHeight = pxPerHour * 24;

  const positionedEvents = useMemo(() => calculatePositions(events), [events]);

  return (
    <div>
      <div className="mb-2">
        <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Timeline
        </h4>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          on {dayjs(date).format('dddd, MMM D')}
        </p>
      </div>

      <div
        className={`border rounded flex select-none ${
          darkMode
            ? 'bg-gray-900 text-white border-gray-700'
            : 'bg-white text-gray-900 border-gray-300'
        }`}
        style={{ width: '320px', fontFamily: 'Arial, sans-serif' }}
      >
        <div
          className="flex w-full overflow-y-auto relative"
          style={{ height: '550px', WebkitOverflowScrolling: 'touch' }}
        >
          <div
            className={`w-12 relative border-r shrink-0 ${
              darkMode
                ? 'border-gray-700 bg-gray-900 text-gray-400'
                : 'border-gray-300 bg-gray-50 text-gray-500'
            } text-right text-xs`}
          >
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="absolute right-2 leading-[14px]"
                style={{ top: `${i * pxPerHour - 7}px`, height: '14px' }}
              >
                {i}:00
              </div>
            ))}
          </div>

          <div className="flex-1 relative min-w-0" style={{ height: `${timelineHeight}px` }}>
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className={`absolute left-0 right-0 z-0 pointer-events-none border-t ${
                  darkMode ? 'border-gray-700' : 'border-gray-300'
                }`}
                style={{ top: `${i * pxPerHour}px` }}
              />
            ))}

            {positionedEvents.map((event, idx) => {
              const start = timeToMinutes(event.startTime);
              const end = timeToMinutes(event.endTime);
              const top = (start / 60) * pxPerHour;
              const height = Math.max(((end - start) / 60) * pxPerHour, 20);

              const widthPercent = 100 / event.lanesCount;
              const leftPercent = widthPercent * event.lane;

              const bgColor = hexToRgba(event.color || '#3B82F6', 0.3);
              const borderColor = event.color || '#3B82F6';

              return (
                <div
                  key={event.id || idx}
                  className="absolute rounded px-1 py-0.5 text-xs cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis transition-shadow duration-200"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    backgroundColor: bgColor,
                    borderLeft: `4px solid ${borderColor}`,
                    color: darkMode ? '#FFF' : '#000',
                    boxShadow: `0 0 5px ${borderColor}`,
                    zIndex: 10,
                  }}
                  title={`${event.title}\n${event.startTime} - ${event.endTime}`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 10px ${borderColor}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 5px ${borderColor}`;
                  }}
                >
                  {event.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayTimeline;




