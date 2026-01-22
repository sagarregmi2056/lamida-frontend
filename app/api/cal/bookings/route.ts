import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
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

  try {
    const body = await request.json();
    const { startTime, name, email, timeZone } = body;

    if (!startTime || !email) {
      return NextResponse.json(
        { error: "Missing required fields: startTime (or start), email" },
        { status: 400 }
      );
    }

    const bookingData = {
      eventTypeId: Number(eventTypeId),
      start: startTime,
      attendee: {
        email: email,
        ...(name && name.trim() && { name: name.trim() }),
        timeZone: timeZone || "UTC",
      },
    };

    console.log("Creating booking with data:", JSON.stringify(bookingData, null, 2));
    const response = await fetch("https://api.cal.com/v2/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cal.com API error:", errorText);
      return NextResponse.json(
        { error: "Failed to create booking", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Cal.com API error:", error);
    return NextResponse.json(
      { 
        error: "Failed to create booking", 
        details: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
