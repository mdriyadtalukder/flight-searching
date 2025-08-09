import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from "date-fns";

const SimpleDateInput = ({ value, onChange, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(
    format(value || today, "MMM-yyyy")
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const handleDateSelect = (day) => {
    onChange?.(day);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".date-picker-container")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative date-picker-container">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full justify-start text-left font-normal text-lg h-15.5 px-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 focus:border-purple-500 transition-all bg-white flex items-center ${
          !value ? "text-gray-400" : "text-gray-900"
        }`}
      >
        <svg
          className="mr-3 h-5 w-5 text-purple-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        {value ? format(value, "MMMM dd, yyyy") : placeholder}
      </button>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 z-50 bg-white rounded-xl p-6 shadow-xl border border-red-200 min-w-[320px]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {format(firstDayCurrentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={previousMonth}
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 mb-2 text-xs leading-6 text-center text-gray-500 font-medium">
            <div className="py-2">Su</div>
            <div className="py-2">Mo</div>
            <div className="py-2">Tu</div>
            <div className="py-2">We</div>
            <div className="py-2">Th</div>
            <div className="py-2">Fr</div>
            <div className="py-2">Sa</div>
          </div>

          <div className="grid grid-cols-7 text-sm">
            {days.map((day, dayIdx) => (
              <div key={day.toString()} className="py-1">
                <button
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all hover:bg-gray-100 ${
                    value && isEqual(day, value)
                      ? "bg-purple-600 text-white font-semibold hover:bg-purple-700"
                      : ""
                  } ${
                    !value && isToday(day)
                      ? "text-purple-600 font-semibold"
                      : ""
                  } ${
                    value && !isEqual(day, value) && isToday(day)
                      ? "text-purple-600 font-semibold"
                      : ""
                  } ${
                    isSameMonth(day, firstDayCurrentMonth) &&
                    !isToday(day) &&
                    (!value || !isEqual(day, value))
                      ? "text-gray-900"
                      : ""
                  } ${
                    !isSameMonth(day, firstDayCurrentMonth)
                      ? "text-gray-400"
                      : ""
                  }`}
                >
                  <time dateTime={format(day, "yyyy-MM-dd")}>
                    {format(day, "d")}
                  </time>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleDateInput;
