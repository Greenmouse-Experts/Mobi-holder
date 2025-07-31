// import React, { useState, useEffect, useRef } from 'react';

// const CustomCalendar = ({
//   value,
//   onChange,
//   placeholder = "Select date",
//   disabled = false,
//   disableFutureDates = false,
//   disablePastDates = false,
//   minDate,
//   maxDate,
//   className = ""
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
//   const [showYearDropdown, setShowYearDropdown] = useState(false);
//   const [showMonthDropdown, setShowMonthDropdown] = useState(false);
//   const calendarRef = useRef(null);

//   // Month names for display
//   const monthNames = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   // Day names for header
//   const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   // Update selected date when value prop changes
//   useEffect(() => {
//     if (value) {
//       const date = new Date(value);
//       setSelectedDate(date);
//       setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
//     } else {
//       setSelectedDate(null);
//     }
//   }, [value]);

//   // Close calendar when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (calendarRef.current && !calendarRef.current.contains(event.target)) {
//         setIsOpen(false);
//         setShowYearDropdown(false);
//         setShowMonthDropdown(false);
//       }
//     };

//     const handleKeyDown = (event) => {
//       if (event.key === 'Escape') {
//         setIsOpen(false);
//         setShowYearDropdown(false);
//         setShowMonthDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', handleKeyDown);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   // Format date for display
//   const formatDate = (date) => {
//     if (!date) return '';
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // Format date for form submission (YYYY-MM-DD)
//   const formatDateForSubmission = (date) => {
//     if (!date) return '';
//     const day = date.getDate().toString().padStart(2, '0');
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${year}-${month}-${day}`;
//   };

//   // Get days to display in calendar
//   const getCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();

//     // First day of the month
//     const firstDay = new Date(year, month, 1);
//     // Last day of the month
//     const lastDay = new Date(year, month + 1, 0);
//     // First day of the calendar (start of week)
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());

//     const days = [];
//     const currentDate = new Date(startDate);

//     // Generate 42 days (6 weeks)
//     for (let i = 0; i < 42; i++) {
//       days.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     return days;
//   };

//   // Check if date should be disabled
//   const isDateDisabled = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const checkDate = new Date(date);
//     checkDate.setHours(0, 0, 0, 0);

//     if (disableFutureDates && checkDate > today) return true;
//     if (disablePastDates && checkDate < today) return true;
//     if (minDate && checkDate < new Date(minDate)) return true;
//     if (maxDate && checkDate > new Date(maxDate)) return true;

//     return false;
//   };

//   // Check if date is selected
//   const isDateSelected = (date) => {
//     if (!selectedDate) return false;
//     return (
//       date.getDate() === selectedDate.getDate() &&
//       date.getMonth() === selectedDate.getMonth() &&
//       date.getFullYear() === selectedDate.getFullYear()
//     );
//   };

//   // Check if date is today
//   const isToday = (date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   // Handle date selection
//   const handleDateSelect = (date) => {
//     if (isDateDisabled(date)) return;

//     setSelectedDate(date);
//     setIsOpen(false);

//     // Call onChange with formatted date
//     const formattedDate = formatDateForSubmission(date);
//     onChange(formattedDate);
//   };

//   // Navigate months
//   const navigateMonth = (direction) => {
//     setCurrentMonth(prev => {
//       const newMonth = new Date(prev);
//       newMonth.setMonth(newMonth.getMonth() + direction);
//       return newMonth;
//     });
//   };

//   // Navigate years
//   const navigateYear = (direction) => {
//     setCurrentMonth(prev => {
//       const newYear = new Date(prev);
//       newYear.setFullYear(newYear.getFullYear() + direction);
//       return newYear;
//     });
//   };

//   // Generate year options (current year ± 100 years)
//   const generateYearOptions = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let year = currentYear - 100; year <= currentYear + 10; year++) {
//       years.push(year);
//     }
//     return years;
//   };

//   // Handle month selection
//   const handleMonthSelect = (monthIndex) => {
//     setCurrentMonth(prev => {
//       const newMonth = new Date(prev);
//       newMonth.setMonth(monthIndex);
//       return newMonth;
//     });
//     setShowMonthDropdown(false);
//   };

//   // Handle year selection
//   const handleYearSelect = (year) => {
//     setCurrentMonth(prev => {
//       const newYear = new Date(prev);
//       newYear.setFullYear(year);
//       return newYear;
//     });
//     setShowYearDropdown(false);
//   };

//   const calendarDays = getCalendarDays();
//   const yearOptions = generateYearOptions();

//   return (
//     <div className={`relative w-full ${className}`} ref={calendarRef}>
//       {/* Input Field */}
//       <div
//         className={`w-full h-full bg-transparent font-normal outline-none focus:outline-none transition-all text-base px-3 py-3 rounded-[7px] cursor-pointer relative ${
//           disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
//         }`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center justify-between">
//           <span>
//             {selectedDate ? formatDate(selectedDate) : <span className="text-gray-400">{placeholder}</span>}
//           </span>
//           <svg
//             className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </div>

//       {/* Calendar Dropdown */}
//       {isOpen && !disabled && (
//         <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-[320px]">
//           {/* Header with Enhanced Navigation */}
//           <div className="flex items-center justify-between mb-4">
//             <button
//               type="button"
//               onClick={() => navigateYear(-1)}
//               className="p-2 hover:bg-gray-100 rounded text-lg font-bold"
//               title="Previous Year"
//             >
//               «
//             </button>
//             <button
//               type="button"
//               onClick={() => navigateMonth(-1)}
//               className="p-2 hover:bg-gray-100 rounded text-lg"
//               title="Previous Month"
//             >
//               ‹
//             </button>

//             {/* Month and Year Selectors */}
//             <div className="flex-1 flex items-center justify-center gap-2">
//               {/* Month Dropdown */}
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowMonthDropdown(!showMonthDropdown);
//                     setShowYearDropdown(false);
//                   }}
//                   className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-semibold transition-colors"
//                 >
//                   {monthNames[currentMonth.getMonth()]}
//                 </button>

//                 {showMonthDropdown && (
//                   <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60 max-h-48 overflow-y-auto">
//                     {monthNames.map((month, index) => (
//                       <button
//                         key={index}
//                         type="button"
//                         onClick={() => handleMonthSelect(index)}
//                         className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
//                           index === currentMonth.getMonth() ? 'bg-purple-100 text-purple-600' : ''
//                         }`}
//                       >
//                         {month}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Year Dropdown */}
//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowYearDropdown(!showYearDropdown);
//                     setShowMonthDropdown(false);
//                   }}
//                   className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-semibold transition-colors"
//                 >
//                   {currentMonth.getFullYear()}
//                 </button>

//                 {showYearDropdown && (
//                   <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60 max-h-48 overflow-y-auto">
//                     {yearOptions.map((year) => (
//                       <button
//                         key={year}
//                         type="button"
//                         onClick={() => handleYearSelect(year)}
//                         className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
//                           year === currentMonth.getFullYear() ? 'bg-purple-100 text-purple-600' : ''
//                         }`}
//                       >
//                         {year}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={() => navigateMonth(1)}
//               className="p-2 hover:bg-gray-100 rounded text-lg"
//               title="Next Month"
//             >
//               ›
//             </button>
//             <button
//               type="button"
//               onClick={() => navigateYear(1)}
//               className="p-2 hover:bg-gray-100 rounded text-lg font-bold"
//               title="Next Year"
//             >
//               »
//             </button>
//           </div>

//           {/* Day Headers */}
//           <div className="grid grid-cols-7 gap-1 mb-2">
//             {dayNames.map(day => (
//               <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
//                 {day}
//               </div>
//             ))}
//           </div>

//           {/* Calendar Days */}
//           <div className="grid grid-cols-7 gap-1">
//             {calendarDays.map((date, index) => {
//               const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
//               const isDisabled = isDateDisabled(date);
//               const isSelected = isDateSelected(date);
//               const isTodayDate = isToday(date);

//               return (
//                 <button
//                   key={index}
//                   type="button"
//                   onClick={() => handleDateSelect(date)}
//                   disabled={isDisabled}
//                   tabIndex={isCurrentMonth && !isDisabled ? 0 : -1}
//                   className={`
//                     p-2 text-sm rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400
//                     ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
//                     ${isSelected ? 'bg-purple-500 text-white shadow-md' : ''}
//                     ${isTodayDate && !isSelected ? 'bg-purple-100 text-purple-600 font-semibold' : ''}
//                     ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 active:bg-gray-200'}
//                     ${isSelected && isDisabled ? 'bg-gray-400' : ''}
//                     ${!isCurrentMonth && !isDisabled ? 'hover:bg-gray-50' : ''}
//                   `}
//                 >
//                   {date.getDate()}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Today Button and Quick Actions */}
//           <div className="mt-4 border-t pt-3 flex gap-2">
//             <button
//               type="button"
//               onClick={() => {
//                 const today = new Date();
//                 setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
//                 setShowYearDropdown(false);
//                 setShowMonthDropdown(false);
//               }}
//               className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
//             >
//               This Month
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 const today = new Date();
//                 if (!isDateDisabled(today)) {
//                   handleDateSelect(today);
//                 }
//               }}
//               disabled={isDateDisabled(new Date())}
//               className="flex-1 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Select Today
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomCalendar;

import React, { useState, useEffect, useRef } from "react";

const CustomCalendar = ({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false,
  disableFutureDates = false,
  disablePastDates = false,
  minDate,
  maxDate,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(value) : null,
  );
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const calendarRef = useRef(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowYearDropdown(false);
        setShowMonthDropdown(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setShowYearDropdown(false);
        setShowMonthDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatDateForSubmission = (date) => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const getCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

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

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const handleDateSelect = (date) => {
    if (isDateDisabled(date)) return;

    setSelectedDate(date);
    setIsOpen(false);
    const formattedDate = formatDateForSubmission(date);
    onChange(formattedDate);
  };

  const navigateMonth = (direction) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(newMonth.getMonth() + direction);
      return newMonth;
    });
  };

  const navigateYear = (direction) => {
    setCurrentMonth((prev) => {
      const newYear = new Date(prev);
      newYear.setFullYear(newYear.getFullYear() + direction);
      return newYear;
    });
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear - 100; year <= currentYear + 10; year++) {
      years.push(year);
    }
    return years;
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      newMonth.setMonth(monthIndex);
      return newMonth;
    });
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year) => {
    setCurrentMonth((prev) => {
      const newYear = new Date(prev);
      newYear.setFullYear(year);
      return newYear;
    });
    setShowYearDropdown(false);
  };

  const calendarDays = getCalendarDays();
  const yearOptions = generateYearOptions();

  return (
    <div className={`relative inline-block ${className}`} ref={calendarRef}>
      {/* Input Field */}
      <div
        className={`w-full h-full bg-transparent font-normal outline-none focus:outline-none transition-all text-base px-3 py-3 rounded-[7px] cursor-pointer relative ${
          disabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span>
            {selectedDate ? (
              formatDate(selectedDate)
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </span>
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Horizontal Calendar Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute top-0  ml-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 min-w-[320px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateYear(-1)}
              className="p-2 hover:bg-gray-100 rounded text-lg font-bold"
            >
              «
            </button>
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded text-lg"
            >
              ‹
            </button>

            <div className="flex-1 flex items-center justify-center gap-2">
              <div className="relative">
                <button
                  onClick={() => {
                    setShowMonthDropdown(!showMonthDropdown);
                    setShowYearDropdown(false);
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-semibold"
                >
                  {monthNames[currentMonth.getMonth()]}
                </button>
                {showMonthDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60 max-h-48 overflow-y-auto">
                    {monthNames.map((month, index) => (
                      <button
                        key={index}
                        onClick={() => handleMonthSelect(index)}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                          index === currentMonth.getMonth()
                            ? "bg-purple-100 text-purple-600"
                            : ""
                        }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => {
                    setShowYearDropdown(!showYearDropdown);
                    setShowMonthDropdown(false);
                  }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-semibold"
                >
                  {currentMonth.getFullYear()}
                </button>
                {showYearDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-60 max-h-48 overflow-y-auto">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearSelect(year)}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                          year === currentMonth.getFullYear()
                            ? "bg-purple-100 text-purple-600"
                            : ""
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded text-lg"
            >
              ›
            </button>
            <button
              onClick={() => navigateYear(1)}
              className="p-2 hover:bg-gray-100 rounded text-lg font-bold"
            >
              »
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth();
              const isDisabled = isDateDisabled(date);
              const isSelected = isDateSelected(date);
              const isTodayDate = isToday(date);

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled}
                  tabIndex={isCurrentMonth && !isDisabled ? 0 : -1}
                  className={`
                    p-2 text-sm rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400
                    ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                    ${isSelected ? "bg-purple-500 text-white shadow-md" : ""}
                    ${isTodayDate && !isSelected ? "bg-purple-100 text-purple-600 font-semibold" : ""}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 active:bg-gray-200"}
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer Buttons */}
          <div className="mt-4 border-t pt-3 flex gap-2">
            <button
              onClick={() => {
                const today = new Date();
                setCurrentMonth(
                  new Date(today.getFullYear(), today.getMonth(), 1),
                );
                setShowYearDropdown(false);
                setShowMonthDropdown(false);
              }}
              className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              This Month
            </button>
            <button
              onClick={() => {
                const today = new Date();
                if (!isDateDisabled(today)) handleDateSelect(today);
              }}
              disabled={isDateDisabled(new Date())}
              className="flex-1 py-2 text-sm bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
