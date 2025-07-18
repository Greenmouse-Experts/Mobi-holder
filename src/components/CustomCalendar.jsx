import React, { useState, useEffect, useRef } from 'react';

const CustomCalendar = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  disableFutureDates = false,
  disablePastDates = false,
  minDate,
  maxDate,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const calendarRef = useRef(null);

  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Day names for header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Update selected date when value prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Format date for form submission (YYYY-MM-DD)
  const formatDateForSubmission = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Get days to display in calendar
  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    // First day of the calendar (start of week)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    // Generate 42 days (6 weeks)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  // Check if date should be disabled
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    if (disableFutureDates && checkDate > today) return true;
    if (disablePastDates && checkDate < today) return true;
    if (minDate && checkDate < new Date(minDate)) return true;
    if (maxDate && checkDate > new Date(maxDate)) return true;
    
    return false;
  };

  // Check if date is selected
  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;
    
    setSelectedDate(date);
    setIsOpen(false);
    
    // Call onChange with formatted date
    const formattedDate = formatDateForSubmission(date);
    onChange(formattedDate);
  };

  // Navigate months
  const navigateMonth = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  // Navigate years
  const navigateYear = (direction) => {
    setCurrentMonth(prev => {
      const newYear = new Date(prev);
      newYear.setFullYear(newYear.getFullYear() + direction);
      return newYear;
    });
  };

  const calendarDays = getCalendarDays();

  return (
    <div className={`relative w-full ${className}`} ref={calendarRef}>
      {/* Input Field */}
      <div
        className={`w-full h-full bg-transparent font-normal outline-none focus:outline-none transition-all text-base px-3 py-3 rounded-[7px] cursor-pointer ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedDate ? formatDate(selectedDate) : <span className="text-gray-400">{placeholder}</span>}
      </div>

      {/* Calendar Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-[300px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateYear(-1)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Previous Year"
            >
              «
            </button>
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Previous Month"
            >
              ‹
            </button>
            
            <div className="flex-1 text-center font-semibold">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Next Month"
            >
              ›
            </button>
            <button
              type="button"
              onClick={() => navigateYear(1)}
              className="p-1 hover:bg-gray-100 rounded"
              title="Next Year"
            >
              »
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isDisabled = isDateDisabled(date);
              const isSelected = isDateSelected(date);
              const isTodayDate = isToday(date);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled}
                  className={`
                    p-2 text-sm rounded transition-colors
                    ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                    ${isSelected ? 'bg-purple-500 text-white' : ''}
                    ${isTodayDate && !isSelected ? 'bg-purple-100 text-purple-600' : ''}
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}
                    ${isSelected && isDisabled ? 'bg-gray-400' : ''}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Today Button */}
          <div className="mt-4 border-t pt-3">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                if (!isDateDisabled(today)) {
                  handleDateSelect(today);
                }
              }}
              disabled={isDateDisabled(new Date())}
              className="w-full py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
