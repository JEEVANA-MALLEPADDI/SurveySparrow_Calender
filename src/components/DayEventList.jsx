
import React from 'react';
import dayjs from 'dayjs';

const DayEventList = ({ date, events, darkMode }) => {
  const formatted = dayjs(date).format('dddd, MMM D');

  const sortedEvents = [...events].sort((a, b) => {
  const aTime = dayjs(`${a.date} ${a.startTime}`, 'YYYY-MM-DD HH:mm');
  const bTime = dayjs(`${b.date} ${b.startTime}`, 'YYYY-MM-DD HH:mm');
  return aTime - bTime;
});


  return (
    <div
      className={`w-full sm:w-80 p-1 rounded shadow-md ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      <h3 className="text-lg font-bold mb-2">Events on {formatted}</h3>

      <div className="h-35 overflow-y-auto pr-1">
        {sortedEvents.length === 0 ? (
          <p className="text-sm text-gray-500">No events</p>
        ) : (
          <ul className="space-y-2">
            {sortedEvents.map(event => {
              const color = event.color || '#888';
              const background = hexToRgba(color, darkMode ? 0.1 : 0.05);

              return (
                <li
                  key={event.id}
                  className="p-2 rounded text-l border-l-8"
                  style={{
                    backgroundColor: background,
                    color: color,
                    borderLeftColor: color,
                    textDecoration: event.status === 'done' ? 'line-through' : 'none',
                    opacity: event.status === 'done' ? 0.7 : 1,
                  }}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div>
                    {event.startTime} - {event.endTime}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

// Converts hex color to rgba
const hexToRgba = (hex, alpha = 0.1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default DayEventList;
