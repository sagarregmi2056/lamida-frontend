"use client";

import React, { useState, useRef, useEffect } from "react";
import { Clock, Video, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import Image from "next/image";

export default function BookACall() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);

  // Available dates (example - you can make this dynamic)
  const availableDates = [16, 17, 19, 22, 23, 24, 25, 30, 31];
  
  // Available time slots for selected date
  const timeSlots = ["10:00am", "11:00am", "1:00pm", "2:30pm", "4:00pm"];

  // Calendly-supported time zones (major time zones)
  const timeZones = [
    { value: "America/New_York", label: "Eastern time - US & Canada" },
    { value: "America/Chicago", label: "Central time - US & Canada" },
    { value: "America/Denver", label: "Mountain time - US & Canada" },
    { value: "America/Los_Angeles", label: "Pacific time - US & Canada" },
    { value: "America/Phoenix", label: "Arizona" },
    { value: "America/Anchorage", label: "Alaska" },
    { value: "Pacific/Honolulu", label: "Hawaii" },
    { value: "America/Toronto", label: "Toronto" },
    { value: "America/Vancouver", label: "Vancouver" },
    { value: "America/Mexico_City", label: "Mexico City" },
    { value: "America/Sao_Paulo", label: "Sao Paulo" },
    { value: "America/Buenos_Aires", label: "Buenos Aires" },
    { value: "Europe/London", label: "London" },
    { value: "Europe/Paris", label: "Paris" },
    { value: "Europe/Berlin", label: "Berlin" },
    { value: "Europe/Rome", label: "Rome" },
    { value: "Europe/Madrid", label: "Madrid" },
    { value: "Europe/Amsterdam", label: "Amsterdam" },
    { value: "Europe/Stockholm", label: "Stockholm" },
    { value: "Europe/Dublin", label: "Dublin" },
    { value: "Europe/Athens", label: "Athens" },
    { value: "Europe/Moscow", label: "Moscow" },
    { value: "Asia/Dubai", label: "Dubai" },
    { value: "Asia/Kolkata", label: "Mumbai, Kolkata, New Delhi" },
    { value: "Asia/Singapore", label: "Singapore" },
    { value: "Asia/Hong_Kong", label: "Hong Kong" },
    { value: "Asia/Shanghai", label: "Beijing, Shanghai" },
    { value: "Asia/Tokyo", label: "Tokyo" },
    { value: "Asia/Seoul", label: "Seoul" },
    { value: "Asia/Bangkok", label: "Bangkok" },
    { value: "Asia/Jakarta", label: "Jakarta" },
    { value: "Australia/Sydney", label: "Sydney" },
    { value: "Australia/Melbourne", label: "Melbourne" },
    { value: "Australia/Brisbane", label: "Brisbane" },
    { value: "Pacific/Auckland", label: "Auckland" },
    { value: "Africa/Johannesburg", label: "Johannesburg" },
    { value: "Africa/Cairo", label: "Cairo" },
    { value: "America/Santiago", label: "Santiago" },
    { value: "America/Lima", label: "Lima" },
    { value: "America/Bogota", label: "Bogota" },
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add previous month's trailing days
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthDays - i,
        isCurrentMonth: false,
        isAvailable: false,
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        isAvailable: availableDates.includes(day),
      });
    }

    // Add next month's leading days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: day,
        isCurrentMonth: false,
        isAvailable: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean, isAvailable: boolean) => {
    if (isCurrentMonth && isAvailable) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setSelectedDate(newDate);
      setSelectedTime(null);
    }
  };

  const formatSelectedDate = (date: Date) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const days = getDaysInMonth(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const timezoneRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (timezoneRef.current && !timezoneRef.current.contains(event.target as Node)) {
        setIsTimezoneOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedTimezoneLabel = timeZones.find(tz => tz.value === selectedTimezone)?.label || "Eastern time - US & Canada";

  return (
    <section id="book-call" className="relative w-full py-24 bg-black border-t border-white/10 overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark Mesh Gradients - deep blue and purple glows */}
        {/* <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] -right-[10%] w-[60%] h-[70%] bg-blue-700/40 blur-[150px] rounded-full" /> */}
             
             <div className="absolute top-[4%] -left-[-2%] w-[40%] h-[60%] bg-violet-600/50 blur-[120px] rounded-full" />
        {/* <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-black-700/20 blur-[0px] rounded-full" /> */}
        <div className="absolute bottom-[-20%] -right-[-2%] w-[40%] h-[60%] bg-blue-700 blur-[120px] rounded-full" />
        
        {/* Grid Pattern Overlay - Visible from top center, fades as light blue gradient appears */}
        <div 
          className="absolute inset-0 opacity-[0.12]"
          style={{ 
            backgroundImage: 'linear-gradient(rgb(122, 120, 134) 1px, transparent 1px), linear-gradient(90deg,rgb(101, 102, 118) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 150% 200% at 50% 0%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 60%, transparent 80%)'
          }}
        />
        
        {/* Subtle radial overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4">
            Book a Call
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Schedule a meeting with our team to discuss how we can help you build on Bittensor.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 overflow-hidden rounded-3xl border border-white/20 bg-[#0A0A0A]">
            {/* Left Panel - Event Type Selection */}
            <div className="lg:col-span-1 border-r border-white/20">
              <div className="p-6 h-full">
                {/* Logo and Host Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <Image src="/logo.png" alt="Lamida" width={100} height={100} />
                    </div>
                    <span className="text-white font-bold text-lg">Lamida</span>
                  </div>
                  
                  {/* Host Profile */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/30">
                      <Image 
                        src="/krishnadaiimage.jpeg" 
                        alt="Krishna Dahal" 
                        width={48} 
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-white font-medium">Krishna Dahal</p>
                    </div>
                  </div>
                </div>

                {/* Meeting Type Info */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 text-sm">Meeting Type</h3>
                  <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
                    <h4 className="text-white font-semibold mb-2 text-base">Client Check-in</h4>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>30 min</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5" />
                        <span>Zoom</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder lines for additional info */}
                <div className="space-y-2 mt-6">
                  <div className="h-2 bg-gray-800/50 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-800/50 rounded w-1/2"></div>
                  <div className="h-2 bg-gray-800/50 rounded w-5/6"></div>
                </div>
              </div>
            </div>

            {/* Middle Panel - Calendar */}
            <div className="lg:col-span-1 border-r border-white/20 p-6">
              <div className="h-full flex flex-col">
                {/* Calendar Section */}
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-4 text-lg">Select a Date & Time</h3>
                  
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <h4 className="text-white font-semibold text-base">
                      {monthNames[currentMonth]} {currentYear}
                    </h4>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs text-gray-500 font-medium py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {days.map((dayData, index) => {
                      const isSelected =
                        selectedDate &&
                        dayData.isCurrentMonth &&
                        dayData.date === selectedDate.getDate() &&
                        currentMonth === selectedDate.getMonth() &&
                        currentYear === selectedDate.getFullYear();

                      return (
                        <button
                          key={index}
                          onClick={() =>
                            handleDateClick(dayData.date, dayData.isCurrentMonth, dayData.isAvailable)
                          }
                          disabled={!dayData.isCurrentMonth || !dayData.isAvailable}
                          className={`
                            aspect-square p-2 rounded-full text-sm font-medium transition-all flex items-center justify-center
                            ${
                              !dayData.isCurrentMonth
                                ? "text-gray-700 cursor-not-allowed"
                                : dayData.isAvailable
                                ? isSelected
                                  ? "bg-blue-500 text-white"
                                  : "text-gray-300 hover:bg-blue-500/10 cursor-pointer border-2 border-blue-500/30"
                                : "text-gray-600 cursor-not-allowed"
                            }
                          `}
                        >
                          {dayData.date}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Zone Selector */}
                <div className="mt-auto" ref={timezoneRef}>
                  <label className="text-gray-400 text-sm mb-2 block">Time zone</label>
                  <div className="relative">
                    <button
                      onClick={() => setIsTimezoneOpen(!isTimezoneOpen)}
                      className="w-full flex items-center gap-2 p-3 rounded-lg border border-white/10 bg-[#0A0A0A] hover:bg-white/5 transition-colors"
                    >
                      <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-white text-sm flex-1 text-left">{selectedTimezoneLabel}</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isTimezoneOpen ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {isTimezoneOpen && (
                      <div className="absolute bottom-full left-0 right-0 mb-2 max-h-60 overflow-y-auto rounded-lg border border-white/10 bg-[#0A0A0A] shadow-xl z-50 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                        {timeZones.map((tz) => (
                          <button
                            key={tz.value}
                            onClick={() => {
                              setSelectedTimezone(tz.value);
                              setIsTimezoneOpen(false);
                            }}
                            className={`
                              w-full text-left px-4 py-2.5 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg
                              ${selectedTimezone === tz.value
                                ? "bg-blue-500/20 text-white"
                                : "text-gray-300 hover:bg-white/5"
                              }
                            `}
                          >
                            {tz.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Time Slots */}
            <div className="lg:col-span-1 p-6">
              <div className="h-full flex flex-col">
                {selectedDate ? (
                  <>
                    <div className="text-white font-medium mb-4 text-sm">
                      {formatSelectedDate(selectedDate)}
                    </div>
                    <div className="space-y-2">
                      {timeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <div key={time} className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedTime(time)}
                              className={`
                                flex-1 py-3 px-4 rounded-lg border text-sm font-medium transition-all
                                ${
                                  isSelected
                                    ? "bg-blue-500/30 border-blue-500/50 text-white"
                                    : "bg-[#0A0A0A] border-blue-500/50 text-gray-300 hover:bg-blue-500/10"
                                }
                              `}
                            >
                              {time}
                            </button>
                            {isSelected && (
                              <button
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors"
                              >
                                Confirm
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Select a date to view available times
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

