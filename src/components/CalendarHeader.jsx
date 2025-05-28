
import React from 'react';


const CalendarHeader = ({ currentDate, prevMonth, nextMonth }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth} className="text-xl px-4 ">←</button>
      <h2 className="text-2xl font-bold ml-3 text-center min-w-[200px]">
        {currentDate.format('MMMM YYYY')}
      </h2>
      <button onClick={nextMonth} className="text-xl px-4">→</button>
    </div>
  );
};

export default CalendarHeader;
