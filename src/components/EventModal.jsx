import React from "react";

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  // Use the color directly from event data
  const colorHex = event.color || "#000";
  const background = hexToRgba(colorHex, 0.1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="p-6 rounded-lg w-80 shadow-lg border-l-8"
        style={{
          backgroundColor: background,
          borderLeftColor: colorHex,
          color: colorHex,
        }}
      >
        <h2 className="text-xl font-bold mb-2">{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
        <p><strong>Status:</strong> {event.status}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper to create transparent background from hex
const hexToRgba = (hex, alpha = 0.1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default EventModal;
