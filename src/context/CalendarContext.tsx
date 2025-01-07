import React, { createContext, useContext, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';

interface CalendarContextType {
  currentDate: Date;
  nextMonth: () => void;
  previousMonth: () => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(current => addMonths(current, 1));
  };

  const previousMonth = () => {
    setCurrentDate(current => subMonths(current, 1));
  };

  return (
    <CalendarContext.Provider value={{ currentDate, nextMonth, previousMonth }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
}