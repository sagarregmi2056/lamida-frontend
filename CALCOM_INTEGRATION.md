# Cal.com Integration Documentation

This document describes the Cal.com API integration for booking meetings.

## Overview

The application integrates with Cal.com v2 API to:
- Fetch available time slots for an event type
- Create bookings for scheduled meetings

## Environment Variables

Add these to your `.env.local` file:

```env
CALCOM_API_KEY=your_cal_com_api_key_here
CALCOM_EVENT_TYPE_ID=your_event_type_id_here
```

### Getting Your Cal.com API Key

1. Go to [Cal.com Settings](https://app.cal.com/settings/developer)
2. Navigate to **API Keys**
3. Create a new API key or use an existing one
4. Copy the API key (starts with `cal_`)

### Getting Your Event Type ID

The `CALCOM_EVENT_TYPE_ID` is currently set in the environment variable. To get or change it:

#### Method 1: Using Cal.com API

Create a temporary API endpoint to fetch event types:

```typescript
// app/api/cal/event-types/route.ts (temporary file)
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.CALCOM_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch("https://api.cal.com/v2/event-types", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

Then call: `GET /api/cal/event-types` to get a list of all your event types with their IDs.

#### Method 2: From Cal.com Dashboard

1. Go to [Cal.com Event Types](https://app.cal.com/event-types)
2. Click on the event type you want to use
3. Check the URL - it should contain the event type ID
4. Or check the browser's network tab when loading the page to see API calls

## API Endpoints

### 1. Get Available Slots

**Endpoint:** `GET /api/cal/slots`

**Query Parameters:**
- `startTime` (required): ISO 8601 timestamp for the start of the date range
- `endTime` (required): ISO 8601 timestamp for the end of the date range

**Example:**
```
GET /api/cal/slots?startTime=2026-01-24T00:00:00.000Z&endTime=2026-01-24T23:59:59.999Z
```

**Response:**
```json
{
  "slots": [
    "2026-01-24T03:30:00.000Z",
    "2026-01-24T04:00:00.000Z",
    ...
  ],
  "original": { ... }
}
```

### 2. Create Booking

**Endpoint:** `POST /api/cal/bookings`

**Request Body:**
```json
{
  "startTime": "2026-01-24T03:30:00.000Z",
  "name": "John Doe",
  "email": "john@example.com",
  "timeZone": "America/New_York"
}
```

**Response:**
```json
{
  "id": 12345,
  "uid": "abc123",
  "title": "Meeting with John Doe",
  ...
}
```

## Cal.com API v2 Format

The integration uses Cal.com API v2, which requires:

- **Authentication:** Bearer token in `Authorization` header
- **API Version:** `2024-08-13` in `cal-api-version` header
- **Booking Format:**
  ```json
  {
    "eventTypeId": 123,
    "start": "2026-01-24T03:30:00.000Z",
    "attendee": {
      "email": "user@example.com",
      "name": "John Doe",
      "timeZone": "America/New_York"
    }
  }
  ```

## Adding Multiple Event Types

If you need to support multiple event types in the future:

1. Create a new API endpoint: `/api/cal/event-types/route.ts` (see example above)
2. Modify the frontend to allow users to select an event type
3. Pass the selected `eventTypeId` to the slots and bookings endpoints
4. Update the API routes to accept `eventTypeId` as a parameter instead of reading from env

Example modification for slots endpoint:
```typescript
const eventTypeId = searchParams.get("eventTypeId") || process.env.CALCOM_EVENT_TYPE_ID;
```

## Troubleshooting

### No Slots Available

If you see empty slots, check:
1. Event type is **enabled/published** in Cal.com
2. **Working hours** are configured for the event type
3. **Availability** is set up correctly
4. Date range doesn't include past dates

### Booking Fails

Common issues:
- Invalid `timeZone` - must be a valid IANA timezone (e.g., `America/New_York`)
- Invalid `start` time - must be a valid ISO 8601 timestamp
- Missing required fields (`email`, `startTime`)
- Event type ID doesn't exist or is incorrect

### API Errors

Check the server logs for detailed error messages from Cal.com API. Most errors include helpful details about what's wrong.

## Files

- `/app/api/cal/slots/route.ts` - Fetches available time slots
- `/app/api/cal/bookings/route.ts` - Creates bookings
- `/components/BookACall.tsx` - Frontend booking component

