import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.CALENDLY_ACCESS_TOKEN;
  const userUri = process.env.CALENDLY_USER_URI;

  if (!accessToken || !userUri) {
    return NextResponse.json(
      { error: "Calendly credentials not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.calendly.com/event_types?user=${encodeURIComponent(userUri)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Calendly API error:", errorText);
      throw new Error(`Failed to fetch from Calendly API: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Calendly API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch event types", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

