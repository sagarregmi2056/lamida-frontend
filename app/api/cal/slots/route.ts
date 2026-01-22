import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.CALCOM_API_KEY;
  const eventTypeId = process.env.CALCOM_EVENT_TYPE_ID;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Cal.com API key not configured" },
      { status: 500 }
    );
  }

  if (!eventTypeId) {
    return NextResponse.json(
      { 
        error: "Missing configuration", 
        details: "Please set CALCOM_EVENT_TYPE_ID in .env file"
      },
      { status: 400 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");

  if (!startTime || !endTime) {
    return NextResponse.json(
      { error: "Missing required parameters: startTime and endTime (ISO 8601 format)" },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.cal.com/v2/slots/available?eventTypeId=${eventTypeId}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cal.com API error:", errorText);
      return NextResponse.json(
        { error: "Failed to fetch slots", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Cal.com v2 slots/available response:", JSON.stringify(data, null, 2));
    
    let slots = [];
    if (Array.isArray(data)) {
      slots = data;
    } else if (Array.isArray(data.data)) {
      slots = data.data;
    } else if (Array.isArray(data.slots)) {
      slots = data.slots;
    } else if (data.data?.slots) {
      const slotsObj = data.data.slots;
      if (typeof slotsObj === 'object' && !Array.isArray(slotsObj)) {
        Object.values(slotsObj).forEach((dateSlots: any) => {
          if (Array.isArray(dateSlots)) {
            dateSlots.forEach((slot: any) => {
              if (slot && slot.time) {
                slots.push(slot.time);
              } else if (typeof slot === 'string') {
                slots.push(slot);
              } else if (slot) {
                slots.push(slot);
              }
            });
          }
        });
      }
    } else if (data.slots && typeof data.slots === 'object' && !Array.isArray(data.slots)) {
      Object.values(data.slots).forEach((dateSlots: any) => {
        if (Array.isArray(dateSlots)) {
          dateSlots.forEach((slot: any) => {
            if (slot && slot.time) {
              slots.push(slot.time);
            } else if (typeof slot === 'string') {
              slots.push(slot);
            } else if (slot) {
              slots.push(slot);
            }
          });
        }
      });
    }
    
    console.log(`Extracted ${slots.length} slots from response`);
    
    // If no slots found, provide helpful message
    if (slots.length === 0) {
      console.warn("⚠️ No available slots found. This usually means:");
      console.warn("1. No availability is configured in Cal.com for these dates");
      console.warn("2. Working hours are not set up for this event type");
      console.warn("3. The event type might not be enabled/published");
      console.warn("4. All slots in this range might be already booked");
      console.warn(`Date range: ${startTime} to ${endTime}`);
      console.warn(`Event Type ID: ${eventTypeId}`);
    }
    
    return NextResponse.json({
      slots,
      original: data, // Include original for debugging
      message: slots.length === 0 
        ? "No available slots found. Please check your Cal.com availability settings."
        : undefined
    });
  } catch (error) {
    console.error("Cal.com API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch available slots", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
