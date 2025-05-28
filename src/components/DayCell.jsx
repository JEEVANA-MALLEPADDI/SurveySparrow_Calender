
import React, { useState } from "react";
import dayjs from "dayjs";
import EventModal from "./EventModal";

const DayCell = ({ day, events = [], onClick, darkMode }) => {
  const today = dayjs();
  const isToday = day && today.isSame(day, "day");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  return (
    <div
      className={`h-40 w-30 min-w-0 border rounded p-2 text-sm relative transition duration-200 flex flex-col ...
        ${darkMode
          ? "bg-gray-800 border-gray-600 text-white"
          : "bg-white border-gray-400 text-gray-900"
        }`}
      onClick={() => onClick && onClick(day)}
    >
      {day ? (
        <>
          <div
            className={`w-6 h-6 text-center flex items-center justify-center ${
              isToday ? "bg-blue-500 text-white rounded-full" : ""
            } ${darkMode ? "text-white" : "text-black"}`}
          >
            <p className="text-lg">{day.date()}</p>
          </div>

<div className="mt-3.5 space-y-0.5 overflow-hidden">
  {[...events]
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .slice(0, 2)
    .map((event) => (
      <div
        key={event.id}
        onClick={(e) => {
          e.stopPropagation();
          openModal(event);
        }}
        className={`text-xs truncate px-1 py-0.5 rounded cursor-pointer ${
          event.status === "done" ? "line-through opacity-60" : ""
        }`}
        style={{
          backgroundColor: event.color || "#6b7280",
          color: "white",
        }}
        title={`${event.title} (${event.startTime} - ${event.endTime})`}
      >
        <p>
          {event.title}
          <br />({event.startTime})
        </p>
      </div>
    ))}
  {events.length > 2 && (
    <div className={`text-xs ${darkMode ? "text-gray-300" : "text-gray-500"}`}>
      +{events.length - 2} more
    </div>
  )}
</div>

          {selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
        </>
      ) : (
        <div className="h-40 w-30 min-w-0 " />
      )}
    </div>
  );
};

export default DayCell;
