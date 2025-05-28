
import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalendarHeader from './CalendarHeader';
import DayCell from './DayCell';
import DayEventList from './DayEventList';
import DayTimeline from './DayTimeLine'; 

import events from '../data/events.json';

const Calendar = ({darkMode}) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day(); // 0 (Sun) - 6 (Sat)
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const nextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const generateCalendar = () => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(dayjs(new Date(currentDate.year(), currentDate.month(), i)));
    }
    return days;
  };

  const calendarDays = generateCalendar();

  const getEventsForDate = date => {
    return events.filter(ev => dayjs(ev.date).isSame(date, 'day'));
  };

  const handleDateClick = (date) => {
    if (date) setSelectedDate(date);
  };

  return (
    <div className="max-w-7xl mx-auto p-3">
      <div className="flex flex-col md:flex-row md:items-start md:gap-10">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Full Event</h1>
            <CalendarHeader
              currentDate={currentDate}
              prevMonth={prevMonth}
              nextMonth={nextMonth}
              darkMode={darkMode}
              
            />
          </div>

          <div className="grid grid-cols-7 text-center font-semibold mt-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0 mt-2 w-full" >
            {calendarDays.map((day, idx) => (
              <DayCell
                key={idx}
                day={day}
                events={getEventsForDate(day)}
                onClick={() => handleDateClick(day)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
     <div className="w-full md:w-[350px] flex-shrink-0 flex flex-col gap-6">
  <DayEventList
    date={selectedDate}
    events={getEventsForDate(selectedDate)}
    darkMode={darkMode}
  />
  <DayTimeline
  date={selectedDate}
    events={getEventsForDate(selectedDate)}
    darkMode={darkMode}
  />
</div>

       
      </div>
    </div>
  );
};

export default Calendar;
