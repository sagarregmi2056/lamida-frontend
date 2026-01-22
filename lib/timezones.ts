// Utility functions for timezone handling

export interface TimezoneOption {
  value: string;
  label: string;
  region: string;
  offset: string;
}

// Get all available timezones using Intl API
export function getAllTimezones(): TimezoneOption[] {
  try {
    const timezones = Intl.supportedValuesOf('timeZone');
    
    return timezones.map(tz => {
      // Get timezone offset and format
      const date = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'short',
      });
      const parts = formatter.formatToParts(date);
      const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value || '';
      
      // Format label nicely
      const label = formatTimezoneLabel(tz, timeZoneName);
      const region = getTimezoneRegion(tz);
      
      return {
        value: tz,
        label,
        region,
        offset: timeZoneName,
      };
    }).sort((a, b) => {
      // Sort by region first, then by label
      if (a.region !== b.region) {
        return a.region.localeCompare(b.region);
      }
      return a.label.localeCompare(b.label);
    });
  } catch (error) {
    console.error('Error getting timezones:', error);
    // Fallback to common timezones
    return getCommonTimezones();
  }
}

// Format timezone label nicely (e.g., "America/New_York" -> "New York (Eastern Time)")
function formatTimezoneLabel(tz: string, offset: string): string {
  const parts = tz.split('/');
  if (parts.length < 2) return tz;
  
  const city = parts[parts.length - 1].replace(/_/g, ' ');
  const region = parts[0];
  
  // Add offset if available
  if (offset) {
    return `${city} (${offset})`;
  }
  return city;
}

// Get timezone region for grouping
function getTimezoneRegion(tz: string): string {
  if (tz.startsWith('America/')) return 'Americas';
  if (tz.startsWith('Europe/')) return 'Europe';
  if (tz.startsWith('Asia/')) return 'Asia';
  if (tz.startsWith('Africa/')) return 'Africa';
  if (tz.startsWith('Australia/') || tz.startsWith('Pacific/')) return 'Pacific';
  if (tz.startsWith('Atlantic/')) return 'Atlantic';
  if (tz.startsWith('Indian/')) return 'Indian Ocean';
  return 'Other';
}

// Get user's timezone
export function getUserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'America/New_York';
  }
}

// Fallback common timezones if Intl API fails
function getCommonTimezones(): TimezoneOption[] {
  return [
    { value: "America/New_York", label: "New York (EST/EDT)", region: "Americas", offset: "EST/EDT" },
    { value: "America/Chicago", label: "Chicago (CST/CDT)", region: "Americas", offset: "CST/CDT" },
    { value: "America/Denver", label: "Denver (MST/MDT)", region: "Americas", offset: "MST/MDT" },
    { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)", region: "Americas", offset: "PST/PDT" },
    { value: "Europe/London", label: "London (GMT/BST)", region: "Europe", offset: "GMT/BST" },
    { value: "Europe/Paris", label: "Paris (CET/CEST)", region: "Europe", offset: "CET/CEST" },
    { value: "Asia/Tokyo", label: "Tokyo (JST)", region: "Asia", offset: "JST" },
    { value: "Asia/Shanghai", label: "Shanghai (CST)", region: "Asia", offset: "CST" },
    { value: "Australia/Sydney", label: "Sydney (AEDT/AEST)", region: "Pacific", offset: "AEDT/AEST" },
  ];
}

// Group timezones by region
export function groupTimezonesByRegion(timezones: TimezoneOption[]): Record<string, TimezoneOption[]> {
  return timezones.reduce((acc, tz) => {
    if (!acc[tz.region]) {
      acc[tz.region] = [];
    }
    acc[tz.region].push(tz);
    return acc;
  }, {} as Record<string, TimezoneOption[]>);
}

