"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Clock, Video, ChevronLeft, ChevronRight, Globe, Loader2, Mail, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { getAllTimezones, groupTimezonesByRegion, type TimezoneOption } from "@/lib/timezones";
import Toast, { type ToastType } from "./Toast";

interface EventType {
  id: number;
  title: string;
  slug: string;
  length: number;
  locations?: Array<{ type: string; address?: string; displayLocation?: string }>;
}

interface Slot {
  time: string;
  display: string;
  attendees?: number;
}


export default function BookACall() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTimezone, setSelectedTimezone] = useState("America/New_York");
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [timezoneSearch, setTimezoneSearch] = useState("");
  
  // New state for Cal.com integration
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [eventTypeData, setEventTypeData] = useState<EventType | null>(null);
  const [availableDates, setAvailableDates] = useState<Set<number>>(new Set());
  const [loadingEventType, setLoadingEventType] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Dynamic timezones
  const allTimezones = useMemo(() => getAllTimezones(), []);
  const groupedTimezones = useMemo(() => groupTimezonesByRegion(allTimezones), [allTimezones]);
  
  // Filter timezones based on search
  const filteredTimezones = useMemo(() => {
    if (!timezoneSearch) return allTimezones;
    const search = timezoneSearch.toLowerCase();
    return allTimezones.filter(tz => 
      tz.label.toLowerCase().includes(search) || 
      tz.value.toLowerCase().includes(search) ||
      tz.region.toLowerCase().includes(search)
    );
  }, [allTimezones, timezoneSearch]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Initialize - no API calls needed, just set defaults
  // Username and eventTypeSlug are read from .env in API routes
  useEffect(() => {
    setLoadingEventType(false);
    setEventTypeData({
      id: 0,
      title: "Client Check-in",
      slug: "",
      length: 30,
      locations: [],
    });
  }, []);

  // Fetch available dates when month changes
  // Note: eventTypeId is read from .env in the API route, so we don't need to pass it
  useEffect(() => {
    // We can fetch slots without eventTypeId since API route reads it from .env

    const fetchAvailableDates = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        // Ensure we're not requesting dates in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const actualStartDate = firstDay < today ? today : firstDay;
        
        // Fetch slots for the entire month (or from today if month started in the past)
        // v2 API uses startTime and endTime in ISO 8601 format
        const startTime = actualStartDate.toISOString();
        const endTime = new Date(lastDay.getTime() + 24 * 60 * 60 * 1000 - 1).toISOString(); // End of last day
        
        console.log(`Fetching slots from ${startTime} to ${endTime} for month ${month + 1}/${year}`);
        
        const response = await fetch(
          `/api/cal/slots?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
        );
        
        if (response.ok) {
          const data = await response.json();
          // console.log("Available dates response:", data);
          
          // API route now returns: { slots: [...], original: {...} }
          const slots = data.slots || [];
          const dates = new Set<number>();
          
          // Extract dates from slot objects (which should have ISO time strings)
          slots.forEach((slot: any) => {
            // Slot might be a string (ISO time) or an object with time/start property
            const slotTime = typeof slot === 'string' ? slot : (slot.time || slot.start || slot.startTime);
            if (!slotTime) {
              console.warn("Slot missing time:", slot);
              return;
            }
            
            const slotDate = new Date(slotTime);
            if (isNaN(slotDate.getTime())) {
              console.warn("Invalid date for slot:", slotTime);
              return;
            }
            
            const slotMonth = slotDate.getMonth();
            const slotYear = slotDate.getFullYear();
            const slotDay = slotDate.getDate();
            
            if (slotMonth === month && slotYear === year) {
              dates.add(slotDay);
            }
          });
          
          // console.log("Final available dates:", Array.from(dates));
          
          // Show helpful message if no slots found
          if (dates.size === 0 && data.message) {
            setError("No available slots found. Please check your Cal.com availability settings.");
          } else if (dates.size === 0) {
            setError("No available slots found for this month. Please configure availability in Cal.com.");
          } else {
            setError(null);
          }
          
          setAvailableDates(dates);
        } else {
          // Handle error response
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          console.error("Error fetching available dates:", errorData);
          if (errorData.error?.includes("CALCOM_EVENT_TYPE_ID")) {
            setError("Please set CALCOM_EVENT_TYPE_ID in .env file");
          } else {
            setError(errorData.details || errorData.error || "Failed to load available dates");
          }
          setAvailableDates(new Set());
        }
      } catch (err) {
        console.error("Error fetching available dates:", err);
      }
    };

    fetchAvailableDates();
  }, [currentDate, selectedTimezone]);

  // Fetch time slots when date is selected
  // Note: eventTypeId is read from .env in the API route
  useEffect(() => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    const fetchSlots = async () => {
      try {
        setLoadingSlots(true);
        setError(null);
        
        // v2 API uses startTime and endTime in ISO 8601 format
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);
        
        const startTime = startOfDay.toISOString();
        const endTime = endOfDay.toISOString();
        
        const response = await fetch(
          `/api/cal/slots?startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`
        );
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Failed to fetch slots" }));
          throw new Error(errorData.details || errorData.error || "Failed to fetch slots");
        }
        
        const data = await response.json();
        console.log("Slots response for selected date:", data);
        
        // API route returns: { slots: [...], original: {...} }
        // Slots are now ISO time strings like "2026-01-24T03:30:00.000Z"
        const slots = data.slots || [];
        
        // Get the selected date in UTC (YYYY-MM-DD format)
        // Create a UTC date from the selected date to avoid timezone issues
        const selectedYear = selectedDate.getFullYear();
        const selectedMonth = selectedDate.getMonth();
        const selectedDay = selectedDate.getDate();
        const utcDate = new Date(Date.UTC(selectedYear, selectedMonth, selectedDay));
        const dateStr = utcDate.toISOString().split('T')[0];
        
        console.log(`Selected date: ${selectedYear}-${selectedMonth + 1}-${selectedDay}`);
        console.log(`Filtering ${slots.length} slots for UTC date: ${dateStr}`);
        
        // Filter slots for the selected date and format for display
        const dateSlots = slots
          .map((slotTime: any) => {
            // Slot is now an ISO time string from the API route
            const timeStr = typeof slotTime === 'string' ? slotTime : (slotTime?.time || slotTime?.start || slotTime?.startTime);
            if (!timeStr) {
              console.warn("Slot missing time:", slotTime);
              return null;
            }
            
            const slotDate = new Date(timeStr);
            if (isNaN(slotDate.getTime())) {
              console.warn("Invalid date for slot:", timeStr);
              return null;
            }
            
            // Check if this slot is for the selected date (compare dates in UTC)
            const slotDateStr = slotDate.toISOString().split('T')[0];
            console.log(`Comparing slot date ${slotDateStr} with selected date ${dateStr}`);
            
            if (slotDateStr !== dateStr) {
              return null; // Not for this date
            }
            
            // Format for display (convert UTC to local time for display)
            const localDate = new Date(slotDate);
            const hours = localDate.getHours();
            const minutes = localDate.getMinutes();
            const displayHours = hours % 12 || 12;
            const displayMinutes = minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : '';
            const ampm = hours >= 12 ? 'pm' : 'am';
            
            return {
              time: timeStr, // Keep original ISO string for booking
              display: `${displayHours}${displayMinutes}${ampm}`,
            };
          })
          .filter((slot: any) => slot !== null)
          .sort((a: any, b: any) => {
            // Sort by time
            return new Date(a.time).getTime() - new Date(b.time).getTime();
          });
        
        console.log(`Found ${dateSlots.length} slots for ${dateStr}:`, dateSlots);
        
        if (dateSlots.length > 0) {
          setAvailableSlots(dateSlots);
        } else {
          setAvailableSlots([]);
          console.warn(`No slots found for date ${dateStr}. Available slots were for other dates.`);
          // Show all available slot dates for debugging
          const allSlotDates = new Set<string>();
          slots.forEach((slotTime: any) => {
            const timeStr = typeof slotTime === 'string' ? slotTime : (slotTime?.time || slotTime?.start || slotTime?.startTime);
            if (timeStr) {
              const slotDate = new Date(timeStr);
              if (!isNaN(slotDate.getTime())) {
                allSlotDates.add(slotDate.toISOString().split('T')[0]);
              }
            }
          });
          console.log("Available slot dates:", Array.from(allSlotDates).sort());
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        setError(err instanceof Error ? err.message : "Failed to load available times");
        setAvailableSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    fetchSlots();
  }, [selectedDate, selectedTimezone]);

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
        isAvailable: availableDates.has(day),
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
      setAvailableSlots([]);
      setError(null);
    }
  };

const handleCreateBooking = async () => {
    if (!selectedDate || !selectedTime || !email || !name.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setLoadingBooking(true);
      setError(null);

      // Find the selected slot's ISO time
      const selectedSlot = availableSlots.find(slot => slot.time === selectedTime);
      if (!selectedSlot) {
        setError("Selected time slot not found");
        return;
      }

      const startTime = selectedSlot.time;

      const response = await fetch("/api/cal/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startTime,
          name: name.trim(),
          email,
          timeZone: selectedTimezone, // IANA timezone (e.g., "America/New_York")
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || "Failed to create booking");
      }

      const data = await response.json();
      setBookingSuccess(true);
      setToast({
        message: "Booking confirmed! Check your email for details.",
        type: "success",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSelectedDate(null);
        setSelectedTime(null);
        setEmail("");
        setName("");
        setBookingSuccess(false);
        setAvailableSlots([]);
        setAvailableDates(new Set());
      }, 3000);
    } catch (err) {
      console.error("Error creating booking:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to create booking";
      setError(errorMessage);
      setToast({
        message: errorMessage,
        type: "error",
      });
    } finally {
      setLoadingBooking(false);
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

  const selectedTimezoneLabel = allTimezones.find(tz => tz.value === selectedTimezone)?.label || selectedTimezone;

  return (
    <section id="book-call" className="relative w-full py-14 bg-black overflow-hidden">
      {/* Background Gradients & Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark Mesh Gradients - deep blue and purple glows */}
        {/* <div className="absolute top-[20%] -left-[10%] w-[50%] h-[60%] bg-blue-600/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-purple-700/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] -right-[10%] w-[60%] h-[70%] bg-blue-700/40 blur-[150px] rounded-full" /> */}
             
             <div className="absolute top-[30%] -left-[-2%] w-[40%] h-[60%] bg-violet-600/50 blur-[120px] rounded-full" />
        {/* <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[50%] bg-black-700/20 blur-[0px] rounded-full" /> */}
        <div className="absolute bottom-[-30%] -right-[-2%] w-[40%] h-[60%] bg-blue-700 blur-[100px] rounded-full" />
        
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
        {/* <div className="absolute bottom-[100%] inset-0 bg-gradient-to-b from-black via-transparent to-black" /> */}
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
                  {loadingEventType ? (
                    <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10 animate-pulse">
                      <div className="h-5 bg-gray-700/50 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
                    </div>
                  ) : error && error.includes("event types") ? (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <XCircle className="w-4 h-4" />
                        <span>{error}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-2">
                        Check console for details. Make sure CALCOM_API_KEY is set in .env
                      </p>
                    </div>
                  ) : eventTypeData ? (
                    <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
                      <h4 className="text-white font-semibold mb-2 text-base">{eventTypeData.title}</h4>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{eventTypeData.length} min</span>
                        </div>
                        {eventTypeData.locations && eventTypeData.locations.length > 0 && (
                          <div className="flex items-center gap-1.5">
                            <Video className="w-3.5 h-3.5" />
                            <span>
                              {eventTypeData.locations[0].type === "integrations:zoom" 
                                ? "Zoom" 
                                : eventTypeData.locations[0].displayLocation || eventTypeData.locations[0].type}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-500/10">
                      <h4 className="text-white font-semibold mb-2 text-base">Client Check-in</h4>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>30 min</span>
                        </div>
                      </div>
                    </div>
                  )}
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
                      <div className="absolute bottom-full left-0 right-0 mb-2 max-h-60 overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0A] shadow-xl z-50 flex flex-col">
                        {/* Search input */}
                        <div className="p-2 border-b border-white/10">
                          <input
                            type="text"
                            placeholder="Search timezone..."
                            value={timezoneSearch}
                            onChange={(e) => setTimezoneSearch(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-[#0D0D0D] border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-blue-500/50"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        {/* Timezone list */}
                        <div className="overflow-y-auto max-h-48 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                          {filteredTimezones.length > 0 ? (
                            filteredTimezones.map((tz) => (
                              <button
                                key={tz.value}
                                onClick={() => {
                                  setSelectedTimezone(tz.value);
                                  setIsTimezoneOpen(false);
                                  setTimezoneSearch("");
                                }}
                                className={`
                                  w-full text-left px-4 py-2.5 text-sm transition-colors
                                  ${selectedTimezone === tz.value
                                    ? "bg-blue-500/20 text-white"
                                    : "text-gray-300 hover:bg-white/5"
                                  }
                                `}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{tz.label}</span>
                                  <span className="text-xs text-gray-500">{tz.offset}</span>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-2.5 text-sm text-gray-500">No timezones found</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Time Slots */}
            <div className="lg:col-span-1 p-6">
              <div className="h-full flex flex-col">
                {error && !bookingSuccess && (
                  <div className="bg-red-900/20 border border-red-500/40 text-red-200 p-3 rounded-lg mb-4 text-sm">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p>We’re having trouble loading available times right now. Please try again in a few minutes.</p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedDate ? (
                  <>
                    <div className="text-white font-medium mb-4 text-sm">
                      {formatSelectedDate(selectedDate)}
                    </div>
                    
                    {/* Loading state */}
                    {loadingSlots ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                      </div>
                    ) : availableSlots.length > 0 ? (
                      <>
                        <div className="mb-4">
                          <p className="text-gray-400 text-xs mb-3">Select a time</p>
                          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent pr-1">
                            {availableSlots.map((slot) => {
                              const isSelected = selectedTime === slot.time;
                              return (
                                <button
                                  key={slot.time}
                                  onClick={() => {
                                    setSelectedTime(slot.time);
                                    setError(null);
                                  }}
                                  className={`
                                    py-2.5 px-2 rounded-lg border text-xs font-medium transition-all cursor-pointer
                                    ${
                                      isSelected
                                        ? "bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-[#0A0A0A] border-white/10 text-gray-300 hover:bg-blue-500/10 hover:border-blue-500/30"
                                    }
                                  `}
                                >
                                  {slot.display}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Booking form - show when time is selected */}
                        {selectedTime && (
                          <div className="space-y-4 mt-auto pt-4 border-t border-white/10">
                            <div>
                              <label className="text-gray-400 text-sm mb-2 block">
                                Your Name <span className="text-red-400">*</span>
                              </label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                  setName(e.target.value);
                                  setError(null);
                                }}
                                placeholder="John Doe"
                                className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#0A0A0A] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                              />
                            </div>
                            
                            <div>
                              <label className="text-gray-400 text-sm mb-2 block">
                                Your Email <span className="text-red-400">*</span>
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError(null);
                                  }}
                                  placeholder="john.doe@example.com"
                                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/10 bg-[#0A0A0A] text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
                                  required
                                />
                              </div>
                            </div>

                            {error && !bookingSuccess && (
                              <div className="flex items-start gap-2 text-red-400 text-xs bg-red-900/20 border border-red-500/30 p-2 rounded-lg">
                                <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                <span>{error}</span>
                              </div>
                            )}

                            {/* Confirm button */}
                            <button
                              onClick={handleCreateBooking}
                              disabled={loadingBooking || !email || !name.trim()}
                              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                            >
                              {loadingBooking ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <span>Booking...</span>
                                </>
                              ) : (
                                "Confirm Booking"
                              )}
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        No available times for this date
                      </div>
                    )}
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
      
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}

