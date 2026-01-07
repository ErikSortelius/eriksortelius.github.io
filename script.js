// Data structure for link categories
const categories = [
  {
    name: "Google",
    links: [
      { name: "YouTube", url: "https://youtube.com", icon: "youtube" },
      { name: "Calendar", url: "https://calendar.google.com", icon: "calendar" },
      { name: "Mail", url: "https://mail.google.com", icon: "mail" },
      { name: "Drive", url: "https://drive.google.com", icon: "hard-drive" }
    ]
  },
  {
    name: "Finance",
    links: [
      { name: "Kivra", url: "https://kivra.com", icon: "credit-card" },
      { name: "Nordea", url: "https://nordea.com", icon: "bank" },
      { name: "SEB", url: "https://seb.se/logga-in", icon: "bank" },
      { name: "Avanza", url: "https://avanza.se", icon: "trending-up" }
    ]
  },
  {
    name: "Fun",
    links: [
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "Reddit", url: "https://reddit.com", icon: "message-circle" },
      { name: "Wallhaven", url: "https://wallhaven.cc", icon: "image" },
      { name: "Fitgirl", url: "https://fitgirl-repacks.site", icon: "download" }
    ]
  },
  {
    name: "AI",
    links: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "message-square" },
      { name: "v0", url: "https://v0.dev", icon: "bot" },
      { name: "Google Studio", url: "https://aistudio.google.com/app/prompts/new_chat", icon: "brain-circuit" }
    ]
  },
  {
    name: "Art",
    links: [
      { name: "Cine2nerdle", url: "https://cine2nerdle.com", icon: "film" },
      { name: "Letterboxd", url: "https://letterboxd.com", icon: "clapperboard" },
      { name: "Plex", url: "https://app.plex.tv", icon: "tv" }
    ]
  }
];

// Icon mappings - Simple SVG icons based on Lucide icons
const icons = {
  // Used icons only
  "hard-drive": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="12" x2="2" y2="12"></line><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path><line x1="6" y1="16" x2="6.01" y2="16"></line><line x1="10" y1="16" x2="10.01" y2="16"></line></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  mail: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  github: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>`,
  "credit-card": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
  bank: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  "trending-up": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`,
  film: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
  "message-circle": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>`,
  "message-square": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  image: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
  download: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  bot: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>`,
  "brain-circuit": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5Z"></path><path d="M16 8V5c0-1.1.9-2 2-2"></path><path d="M12 13h4"></path><path d="M12 18h6a2 2 0 0 1 2 2v1"></path><path d="M12 8h8"></path><path d="M20.5 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M16.5 13a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M20.5 21a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path><path d="M18.5 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"></path></svg>`,
  clapperboard: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8H4Z"></path><path d="m4 11-.88-2.87a2 2 0 0 1 1.33-2.5l11.48-3.5a2 2 0 0 1 2.5 1.33l.87 2.87L4 11.01Z"></path><path d="m6.6 4.99 3.38 4.2"></path><path d="m11.86 3.38 3.38 4.2"></path></svg>`,
  tv: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  // Weather Icons
  "cloud": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
  "cloud-rain": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 14v6"></path><path d="M8 14v6"></path><path d="M12 16v6"></path></svg>`,
  "cloud-snow": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 15h.01"></path><path d="M8 19h.01"></path><path d="M12 17h.01"></path><path d="M12 21h.01"></path><path d="M16 15h.01"></path><path d="M16 19h.01"></path></svg>`,
  "cloud-lightning": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"></path><path d="m13 12-3 5h4l-3 5"></path></svg>`,
  "cloud-drizzle": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M8 19v1"></path><path d="M8 14v1"></path><path d="M16 19v1"></path><path d="M16 14v1"></path><path d="M12 21v1"></path><path d="M12 16v1"></path></svg>`,
  "sun": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`,
  "moon": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`,
  "cloud-fog": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M16 17H7"></path><path d="M17 21H9"></path></svg>`,
  "thermometer": `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"></path></svg>`,
  // Fallback icon
  bookmark: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>`
};

/**
 * CLOCK CONFIGURATION - Easy to modify
 * 
 * To change timezones and labels:
 * 1. Update the timezone property with any valid IANA timezone identifier
 * 2. Update the label property with your preferred display text
 * 
 * Examples of timezone identifiers:
 * - 'America/New_York' (Eastern Time)
 * - 'America/Los_Angeles' (Pacific Time)
 * - 'Europe/London' (GMT/BST)
 * - 'Europe/Paris' (CET/CEST)
 * - 'Asia/Tokyo' (JST)
 * - 'Australia/Sydney' (AEST/AEDT)
 */
const CLOCK_CONFIG = {
  clock1: {
    timezone: 'Europe/Stockholm',
    label: 'SWEDEN'
  },
  clock2: {
    useLocalTime: true,
    label: 'CURRENT LOCATION'
  }
};

// Animation state
let initialAnimationComplete = false;

// DOM elements
const clock1TimeElement = document.getElementById('clock1Time');
const clock2TimeElement = document.getElementById('clock2Time');
const clock1LabelElement = document.getElementById('clock1Label');
const clock2LabelElement = document.getElementById('clock2Label');
const dateElement = document.querySelector('.date');
const weekdayElement = document.querySelector('.weekday');
const weekNumberElement = document.querySelector('.week-number');

// Dual dial elements
const dial1 = document.getElementById('dial1');
const dial2 = document.getElementById('dial2');
const sunIcon1 = document.getElementById('sunIcon1');
const moonIcon1 = document.getElementById('moonIcon1');
const sunIcon2 = document.getElementById('sunIcon2');
const moonIcon2 = document.getElementById('moonIcon2');
const dialRing1 = dial1?.querySelector('.dial-ring');
const dialRing2 = dial2?.querySelector('.dial-ring');
const dialMarker1 = dial1?.querySelector('.dial-marker');
const dialMarker2 = dial2?.querySelector('.dial-marker');

const linksContainer = document.querySelector('.links-container');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

// Weather elements
const weatherContainer = document.querySelector('.weather-container');
const weatherIcon = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feelsLike');
const weatherConditionElement = document.getElementById('weatherCondition');

// Weather configuration
const WEATHER_CONFIG = {
  apiKey: "bd94f199d3a62747c068b5f09da9bfd8",
  defaultLat: 59.3194903,  // Stockholm coordinates (fallback only)
  defaultLon: 18.075060000000007,
  units: "metric",
  cacheTimeMs: 4 * 60 * 60 * 1000, // Cache weather data for 4 hours
  locationCacheKey: "userLocationCache", // Separate cache for location coordinates
  useGeolocation: true  // Set to true to enable geolocation
};

// Weather icons mapping based on OpenWeatherMap icon codes
const weatherIconMap = {
  '01d': 'sun',
  '01n': 'moon',
  '02d': 'cloud',
  '02n': 'cloud',
  '03d': 'cloud',
  '03n': 'cloud',
  '04d': 'cloud',
  '04n': 'cloud',
  '09d': 'cloud-drizzle',
  '09n': 'cloud-drizzle',
  '10d': 'cloud-rain',
  '10n': 'cloud-rain',
  '11d': 'cloud-lightning',
  '11n': 'cloud-lightning',
  '13d': 'cloud-snow',
  '13n': 'cloud-snow',
  '50d': 'cloud-fog',
  '50n': 'cloud-fog',
};

// Location caching functions
function cacheLocationData(coords) {
  try {
    const locationData = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      timestamp: Date.now()
    };
    localStorage.setItem(WEATHER_CONFIG.locationCacheKey, JSON.stringify(locationData));
    console.log('Location cached successfully:', coords);
  } catch (error) {
    console.error('Error caching location data:', error);
  }
}

function getCachedLocationData() {
  try {
    const cachedItem = localStorage.getItem(WEATHER_CONFIG.locationCacheKey);
    if (!cachedItem) return null;

    const locationData = JSON.parse(cachedItem);

    // Check if cache has expired
    if (Date.now() - locationData.timestamp > WEATHER_CONFIG.cacheTimeMs) {
      console.log('Location cache expired, refreshing...');
      localStorage.removeItem(WEATHER_CONFIG.locationCacheKey);
      return null;
    }

    console.log('Using cached location:', locationData);
    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude
    };
  } catch (error) {
    console.error('Error getting cached location data:', error);
    return null;
  }
}

// Geolocation function - moved here before weather functions
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 60 * 60 * 1000 // 1 hour
      }
    );
  });
}

// Utility functions
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function formatDate(date) {
  return date.toLocaleDateString([], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getWeekday(date) {
  return date.toLocaleDateString([], {
    weekday: 'long'
  });
}

function getWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getCurrentHourAngle() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalHours = hours % 12 + minutes / 60;
  return (totalHours / 12) * 360;
}

function checkIsDayTime(current) {
  const hours = current.getHours();
  // Day is between 6 AM and 9 PM
  return hours >= 6 && hours < 21;
}

/**
 * Formats time for a specific timezone or local time
 * @param {string} timezone - IANA timezone identifier (e.g., 'Europe/Stockholm') or null for local
 * @returns {string} Formatted time string (HH:MM)
 */
function formatTimeForTimezone(timezone) {
  const now = new Date();
  if (!timezone) {
    // Return local time
    return now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone
  });
}

function getCurrentHourAngleForTimezone(timezone) {
  const now = new Date();
  let timeInTimezone;
  
  if (!timezone) {
    // Use local time
    timeInTimezone = now;
  } else {
    timeInTimezone = new Date(now.toLocaleString("en-US", {timeZone: timezone}));
  }
  
  const hours = timeInTimezone.getHours();
  const minutes = timeInTimezone.getMinutes();
  const totalHours = hours % 12 + minutes / 60;
  return (totalHours / 12) * 360;
}

function checkIsDayTimeForTimezone(timezone) {
  const now = new Date();
  let timeInTimezone;
  
  if (!timezone) {
    // Use local time
    timeInTimezone = now;
  } else {
    timeInTimezone = new Date(now.toLocaleString("en-US", {timeZone: timezone}));
  }
  
  const hours = timeInTimezone.getHours();
  // Day is between 6 AM and 9 PM
  return hours >= 6 && hours < 21;
}

// Update day/night dials for both timezones
function updateDayNightDials() {
  // Update dial 1 (Sweden timezone)
  const rotationAngle1 = getCurrentHourAngleForTimezone(CLOCK_CONFIG.clock1.timezone);
  const isDay1 = checkIsDayTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
  
  if (dialRing1) {
    dialRing1.style.transform = `rotate(${rotationAngle1}deg)`;
  }
  
  if (sunIcon1 && moonIcon1) {
    sunIcon1.style.opacity = isDay1 ? 1 : 0;
    sunIcon1.style.transform = isDay1 ? 'rotate(0deg)' : 'rotate(90deg)';
    moonIcon1.style.opacity = isDay1 ? 0 : 1;
    moonIcon1.style.transform = isDay1 ? 'rotate(90deg)' : 'rotate(0deg)';
  }
  
  // Update dial 2 (local time)
  const clock2Timezone = CLOCK_CONFIG.clock2.useLocalTime ? null : CLOCK_CONFIG.clock2.timezone;
  const rotationAngle2 = getCurrentHourAngleForTimezone(clock2Timezone);
  const isDay2 = checkIsDayTimeForTimezone(clock2Timezone);
  
  if (dialRing2) {
    dialRing2.style.transform = `rotate(${rotationAngle2}deg)`;
  }
  
  if (sunIcon2 && moonIcon2) {
    sunIcon2.style.opacity = isDay2 ? 1 : 0;
    sunIcon2.style.transform = isDay2 ? 'rotate(0deg)' : 'rotate(90deg)';
    moonIcon2.style.opacity = isDay2 ? 0 : 1;
    moonIcon2.style.transform = isDay2 ? 'rotate(90deg)' : 'rotate(0deg)';
  }
}

// Initialize and Update Clocks
function updateClock() {
  const now = new Date();
  
  // Get times for both configured timezones/local
  const clock1TimeString = formatTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
  const clock2TimeString = CLOCK_CONFIG.clock2.useLocalTime ? 
    formatTimeForTimezone(null) : 
    formatTimeForTimezone(CLOCK_CONFIG.clock2.timezone);
  
  const dateString = formatDate(now);
  const weekdayString = getWeekday(now);
  const weekNumber = getWeekNumber(now);

  // Update both clocks with smooth transitions
  updateTimeWithTransition(clock1TimeString, clock1TimeElement);
  updateTimeWithTransition(clock2TimeString, clock2TimeElement);

  if (dateElement && dateElement.textContent !== dateString) {
    dateElement.style.opacity = 0;
    dateElement.style.transform = 'translateY(8px)';

    requestAnimationFrame(() => {
      dateElement.textContent = dateString;
      // Force reflow
      dateElement.offsetHeight;
      dateElement.style.opacity = 1;
      dateElement.style.transform = 'translateY(0)';
    });
  }

  if (weekdayElement && weekdayElement.textContent !== weekdayString) {
    weekdayElement.style.opacity = 0;
    weekdayElement.style.transform = 'translateY(8px)';

    requestAnimationFrame(() => {
      weekdayElement.textContent = weekdayString;
      // Force reflow
      weekdayElement.offsetHeight;
      weekdayElement.style.opacity = 1;
      weekdayElement.style.transform = 'translateY(0)';
    });
  }

  if (weekNumberElement) {
    weekNumberElement.textContent = `Week ${weekNumber}`;
  }

  // Update dual day/night dials
  updateDayNightDials();
}

// Update time with smooth digit transitions
function updateTimeWithTransition(newTimeString, timeElement) {
  if (!timeElement) return;
  
  const currentTimeDigits = timeElement.textContent.split('');
  const newTimeDigits = newTimeString.split('');

  // Clear current time display
  timeElement.innerHTML = '';

  // Create span for each digit with transition effect
  newTimeDigits.forEach((digit, index) => {
    const digitSpan = document.createElement('span');
    digitSpan.textContent = digit;

    if (currentTimeDigits[index] !== digit) {
      digitSpan.style.opacity = 0;
      digitSpan.style.transform = 'translateY(8px)';

      requestAnimationFrame(() => {
        // Force reflow
        digitSpan.offsetHeight;
        digitSpan.style.opacity = 1;
        digitSpan.style.transform = 'translateY(0)';
      });
    }

    timeElement.appendChild(digitSpan);
  });
}

// Remove the old updateDayNightDialWithSunData function entirely and replace with this:
function updateWeatherBasedDayNightDials(sunrise, sunset) {
  // Only update dial 2 (local time dial) based on weather data
  // Dial 1 (Sweden) continues to use its timezone-based logic
  
  if (!sunrise || !sunset) {
    // If no sunrise/sunset data, just use the regular timezone-based updates
    updateDayNightDials();
    return;
  }

  // Update dial 1 normally (Sweden timezone) - simple 6AM-9PM logic
  const rotationAngle1 = getCurrentHourAngleForTimezone(CLOCK_CONFIG.clock1.timezone);
  const isDay1 = checkIsDayTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
  
  if (dialRing1) {
    dialRing1.style.transform = `rotate(${rotationAngle1}deg)`;
  }
  
  if (sunIcon1 && moonIcon1) {
    sunIcon1.style.opacity = isDay1 ? 1 : 0;
    sunIcon1.style.transform = isDay1 ? 'rotate(0deg)' : 'rotate(90deg)';
    moonIcon1.style.opacity = isDay1 ? 0 : 1;
    moonIcon1.style.transform = isDay1 ? 'rotate(90deg)' : 'rotate(0deg)';
  }

  // Update dial 2 based on actual sunrise/sunset data from weather
  const now = new Date();
  const isDay2 = now >= sunrise && now < sunset;
  
  // Calculate dial position based on sunrise/sunset
  let percentage;
  
  if (isDay2) {
    // It's daytime - calculate how far through the day we are
    const dayLength = sunset - sunrise;
    const timeElapsed = now - sunrise;
    percentage = timeElapsed / dayLength;
  } else {
    // It's nighttime - complex calculation for night progression
    let nightLength;
    if (now < sunrise) {
      // It's before sunrise (early morning)
      const prevSunset = new Date(sunset);
      prevSunset.setDate(prevSunset.getDate() - 1);
      nightLength = sunrise - prevSunset;
      const timeElapsed = now - prevSunset;
      percentage = 0.5 + (timeElapsed / (nightLength * 2));
    } else {
      // It's after sunset (evening)
      const nextSunrise = new Date(sunrise);
      nextSunrise.setDate(nextSunrise.getDate() + 1);
      nightLength = nextSunrise - sunset;
      const timeElapsed = now - sunset;
      percentage = 0.5 + (timeElapsed / (nightLength * 2));
    }
  }

  // Keep percentage between 0 and 1
  percentage = Math.min(Math.max(percentage, 0), 1);
  
  // Convert to degrees (0-360)
  const rotationAngle2 = percentage * 360;
  
  if (dialRing2) {
    dialRing2.style.transform = `rotate(${rotationAngle2}deg)`;
  }
  
  if (sunIcon2 && moonIcon2) {
    sunIcon2.style.opacity = isDay2 ? 1 : 0;
    sunIcon2.style.transform = isDay2 ? 'rotate(0deg)' : 'rotate(90deg)';
    moonIcon2.style.opacity = isDay2 ? 0 : 1;
    moonIcon2.style.transform = isDay2 ? 'rotate(90deg)' : 'rotate(0deg)';
  }
}

// Create link sections
function createLinkSections() {
  // Add null check for linksContainer
  if (!linksContainer) {
    console.error('Links container element not found');
    return;
  }
  
  categories.forEach((category, index) => {
    const section = document.createElement('div');
    section.className = 'link-section';
    
    // Apply initial styles for animation
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    
    const title = document.createElement('h2');
    title.className = `link-section-title ${category.name.toLowerCase()}`;
    title.textContent = category.name;
    
    const linkList = document.createElement('ul');
    linkList.className = 'link-list';
    
    category.links.forEach(link => {
      const linkItem = document.createElement('li');
      linkItem.className = 'link-item';
      
      const linkElement = document.createElement('a');
      linkElement.className = 'link';
      linkElement.href = link.url;
      
      const iconSpan = document.createElement('span');
      iconSpan.className = 'link-icon';
      iconSpan.innerHTML = icons[link.icon] || icons.bookmark;
      
      const linkText = document.createElement('span');
      linkText.textContent = link.name;
      
      linkElement.appendChild(iconSpan);
      linkElement.appendChild(linkText);
      linkItem.appendChild(linkElement);
      linkList.appendChild(linkItem);
    });
    
    section.appendChild(title);
    section.appendChild(linkList);
    linksContainer.appendChild(section);
    
    // Animate each section with a staggered delay
    setTimeout(() => {
      requestAnimationFrame(() => {
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      });
    }, 100 * index); // Stagger the animations
  });
}

// Handle search input focus
function setupSearchInput() {
  // Auto focus on page load after a short delay to allow transitions to complete
  setTimeout(() => {
    if (searchInput) {
      searchInput.focus();
    }
  }, 500);
}

// Weather functions - restructured for better flow
function setupWeather() {
  // Show placeholder immediately
  showWeatherPlaceholder();
  
  // Then fetch weather data
  const deferWeatherLoad = window.requestIdleCallback || 
    ((cb) => setTimeout(cb, 1000));
  
  deferWeatherLoad(() => {
    initializeWeatherWithLocation(false); // Always fetch fresh
  });

  // Add event listener to weather icon for manual refresh
  if (weatherIcon) {
    weatherIcon.addEventListener('click', () => {
      // Manual refresh - skip dial updates to avoid visual disruption
      initializeWeatherWithLocation(false, true);
    });
  }
}

function showWeatherPlaceholder() {
  if (weatherIcon) weatherIcon.innerHTML = icons['cloud'];
  if (temperatureElement) temperatureElement.textContent = '--°';
  if (feelsLikeElement) feelsLikeElement.textContent = 'Realfeel: --°';
  if (weatherConditionElement) weatherConditionElement.textContent = 'Loading...';
}

// Unified location determination flow used both on startup and manual refresh
function initializeWeatherWithLocation(quietMode = false, skipDialUpdate = false) {
  // Step 1: Try to get location using the secure cache -> fetch -> failsafe flow
  determineUserLocation()
    .then(coords => {
      console.log('Location determined:', coords);
      // Step 2: Use the determined location to fetch weather (always fresh)
      fetchWeatherData(true, quietMode, coords, skipDialUpdate); // Always force refresh
    })
    .catch(error => {
      console.error('Failed to determine location:', error);
      if (!quietMode) {
        displayWeatherError();
      }
    });
}

// Secure location determination: cache -> geolocation -> Stockholm failsafe
function determineUserLocation() {
  return new Promise((resolve, reject) => {
    // Step 1: Check for cached location coordinates
    const cachedLocation = getCachedLocationData();
    
    if (cachedLocation) {
      console.log('Using cached location');
      resolve(cachedLocation);
      return;
    }
    
    // Step 2: No cached location, try geolocation if enabled
    if (WEATHER_CONFIG.useGeolocation) {
      console.log('No cached location, requesting geolocation');
      getUserLocation()
        .then(coords => {
          // Cache the coordinates for future use
          cacheLocationData(coords);
          resolve(coords);
        })
        .catch(error => {
          console.warn('Geolocation failed, using Stockholm failsafe:', error);
          // Step 3: Fallback to Stockholm coordinates
          const fallbackCoords = {
            latitude: WEATHER_CONFIG.defaultLat,
            longitude: WEATHER_CONFIG.defaultLon
          };
          resolve(fallbackCoords);
        });
    } else {
      // Step 3: Geolocation disabled, use Stockholm coordinates
      console.log('Geolocation disabled, using Stockholm failsafe');
      const defaultCoords = {
        latitude: WEATHER_CONFIG.defaultLat,
        longitude: WEATHER_CONFIG.defaultLon
      };
      resolve(defaultCoords);
    }
  });
}

function fetchWeatherData(forceRefresh = false, quietMode = false, coordinates = null, skipDialUpdate = false) {
  // We should always have coordinates by this point from determineUserLocation
  if (!coordinates) {
    console.error('fetchWeatherData called without coordinates');
    if (!quietMode) {
      displayWeatherError();
    }
    return;
  }

  // Always fetch fresh weather data - no caching
  // Show loading state (unless in quiet mode)
  if (weatherIcon && !quietMode) {
    weatherIcon.innerHTML = `<div class="weather-loader"></div>`;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=${WEATHER_CONFIG.units}&appid=${WEATHER_CONFIG.apiKey}`;

  console.log(`🌤️ Fetching fresh weather data at ${new Date().toLocaleString()}`);
  console.log(`📍 Location: ${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`);

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(`✅ Fresh weather data received at ${new Date().toLocaleString()}`);
      console.log(`🌡️ Temperature: ${Math.round(data.main.temp)}°C (feels like ${Math.round(data.main.feels_like)}°C)`);
      console.log(`☁️ Condition: ${data.weather[0].description}`);
      console.log(`🏙️ Location: ${data.name}, ${data.sys.country}`);
      console.log(`🌅 Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`);
      console.log(`🌇 Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`);
      
      // Just display the data - no caching
      displayWeatherData(data, false, skipDialUpdate);
    })
    .catch(error => {
      console.error(`❌ Weather fetch failed at ${new Date().toLocaleString()}:`, error);
      if (!quietMode) {
        displayWeatherError();
      }
    });
}

// New function to set temperature gradient
function setTemperatureGradient(temperature) {
  if (!weatherIcon) return;
  
  // Updated temperature ranges
  // Freezing: below 0°C
  // Cold: 0°C to 10°C
  // Mild: 10°C to 20°C
  // Warm: 20°C to 28°C
  // Hot: 28°C to 32°C
  // Very Hot: 32°C to 39°C
  // Scorching: above 39°C
  
  let color;
  let gradient;
  
  if (temperature < 0) {
    gradient = 'linear-gradient(135deg, var(--temp-freezing-1), var(--temp-freezing-2))';
    color = 'var(--blue-300)';
  } else if (temperature < 10) {
    gradient = 'linear-gradient(135deg, var(--temp-cold-1), var(--temp-cold-2))';
    color = 'var(--blue-300)';
  } else if (temperature < 20) {
    gradient = 'linear-gradient(135deg, var(--temp-mild-1), var(--temp-mild-2))';
    color = 'var(--green-300)';
  } else if (temperature < 28) {
    gradient = 'linear-gradient(135deg, var(--temp-warm-1), var(--temp-warm-2))';
    color = 'var(--amber-300)';
  } else if (temperature < 32) {
    gradient = 'linear-gradient(135deg, var(--temp-hot-1), var(--temp-hot-2))';
    color = 'var(--orange-300)';
  } else if (temperature < 39) {
    gradient = 'linear-gradient(135deg, var(--temp-very-hot-1), var(--temp-very-hot-2))';
    color = 'var(--red-300)';
  } else {
    gradient = 'linear-gradient(135deg, var(--temp-scorching-1), var(--temp-scorching-2))';
    color = 'var(--purple-300)'; // Using purple for scorching temperatures
  }
  
  // Set the icon color
  weatherIcon.style.color = color;
  
  // Also set the temperature text color to match
  if (temperatureElement) {
    temperatureElement.style.color = color;
  }
  
  // Apply the gradient to the ::after pseudo-element
  const styleElem = document.createElement('style');
  styleElem.textContent = `.weather-icon::after { background: ${gradient}; }`;
  
  // Remove any previous custom styles
  const oldStyle = document.getElementById('weather-gradient-style');
  if (oldStyle) {
    oldStyle.remove();
  }
  
  // Add the new style
  styleElem.id = 'weather-gradient-style';
  document.head.appendChild(styleElem);
}

function displayWeatherData(data, fromCache = false, skipDialUpdate = false) {
  try {
    // Get icon from mapping or use cloud as fallback
    const iconCode = data.weather[0].icon || '03d';
    const iconName = weatherIconMap[iconCode] || 'cloud';

    // Get temperature and round to nearest whole number
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);

    // Get sunrise and sunset times for day/night dial
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);

    console.log(`🔄 Weather UI updated at ${new Date().toLocaleString()}`);
    console.log(`📊 Displayed: ${temperature}°C, ${data.weather[0].description}, ${iconName} icon`);

    // Update UI
    if (weatherIcon) weatherIcon.innerHTML = icons[iconName];
    if (temperatureElement) temperatureElement.textContent = `${temperature}°`;
    if (feelsLikeElement) {
      feelsLikeElement.textContent = `Realfeel: ${feelsLike}°`;
    }
    
    // Set the temperature gradient based on "feels like" temperature
    setTemperatureGradient(feelsLike);
    
    if (weatherConditionElement) {
      // Capitalize first letter of each word
      const description = data.weather[0].description
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      weatherConditionElement.textContent = description;
    }

    // Don't manipulate opacity here - let the entrance animation handle it
    // for the initial load. Only handle visibility.
    if (weatherContainer && weatherContainer.style.visibility === 'hidden') {
      weatherContainer.style.visibility = 'visible';
    } else if (!initialAnimationComplete && weatherContainer) {
      // Don't interfere with the initial animation
    } else if (weatherContainer && !fromCache) {
      // If this is a refresh after initial load, add the update animation
      weatherContainer.classList.add('weather-updated');
      setTimeout(() => {
        weatherContainer.classList.remove('weather-updated');
      }, 1000);
    }

    // Update day/night dial based on sunrise/sunset if available
    // Skip this update if it's a manual refresh (skipDialUpdate = true)
    if (!skipDialUpdate) {
      updateWeatherBasedDayNightDials(sunrise, sunset);
    }
  } catch (error) {
    console.error('Error parsing weather data:', error);
    displayWeatherError();
  }
}

function displayWeatherError() {
  if (weatherIcon) {
    weatherIcon.innerHTML = icons['cloud'];
    const styleElem = document.createElement('style');
    styleElem.textContent = `.weather-icon::after { background: linear-gradient(135deg, var(--temp-mild-1), var(--temp-mild-2)); }`;
    styleElem.id = 'weather-gradient-style';
    
    const oldStyle = document.getElementById('weather-gradient-style');
    if (oldStyle) {
      oldStyle.remove();
    }
    
    document.head.appendChild(styleElem);
    
    // Set icon and temperature text color
    const color = 'var(--text-color-dim)';
    weatherIcon.style.color = color;
    if (temperatureElement) {
      temperatureElement.style.color = color;
    }
  }
  
  if (temperatureElement) temperatureElement.textContent = '--°';
  if (feelsLikeElement) feelsLikeElement.textContent = 'Realfeel: --°';
  if (weatherConditionElement) weatherConditionElement.textContent = 'Weather Unavailable';
}

// Clean and focused entrance animations
function performEntranceAnimations() {
  const rotationAngle1 = getCurrentHourAngleForTimezone(CLOCK_CONFIG.clock1.timezone);
  const clock2Timezone = CLOCK_CONFIG.clock2.useLocalTime ? null : CLOCK_CONFIG.clock2.timezone;
  const rotationAngle2 = getCurrentHourAngleForTimezone(clock2Timezone);
  const isDay1 = checkIsDayTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
  const isDay2 = checkIsDayTimeForTimezone(clock2Timezone);
  
  // Set initial states for both dials
  if (dialRing1) {
    dialRing1.style.transition = 'none';
    dialRing1.style.transform = 'rotate(0deg)';
  }
  
  if (dialRing2) {
    dialRing2.style.transition = 'none';
    dialRing2.style.transform = 'rotate(0deg)';
  }
  
  if (dialMarker1) {
    dialMarker1.style.transition = 'none';
    dialMarker1.style.opacity = '0';
    dialMarker1.style.transform = 'translate(-50%, -50%) scale(0)';
  }
  
  if (dialMarker2) {
    dialMarker2.style.transition = 'none';
    dialMarker2.style.opacity = '0';
    dialMarker2.style.transform = 'translate(-50%, -50%) scale(0)';
  }
  
  // Set initial states for sun/moon icons
  if (sunIcon1) {
    sunIcon1.style.transition = 'none';
    sunIcon1.style.opacity = '0';
    sunIcon1.style.transform = `rotate(${isDay1 ? -120 : 0}deg)`;
  }
  
  if (moonIcon1) {
    moonIcon1.style.transition = 'none';
    moonIcon1.style.opacity = '0';
    moonIcon1.style.transform = `rotate(${isDay1 ? 0 : 120}deg)`;
  }
  
  if (sunIcon2) {
    sunIcon2.style.transition = 'none';
    sunIcon2.style.opacity = '0';
    sunIcon2.style.transform = `rotate(${isDay2 ? -120 : 0}deg)`;
  }
  
  if (moonIcon2) {
    moonIcon2.style.transition = 'none';
    moonIcon2.style.opacity = '0';
    moonIcon2.style.transform = `rotate(${isDay2 ? 0 : 120}deg)`;
  }
  
  // Set initial state for time displays
  if (clock1TimeElement) {
    const clock1TimeString = formatTimeForTimezone(CLOCK_CONFIG.clock1.timezone);
    clock1TimeElement.innerHTML = '';
    
    clock1TimeString.split('').forEach(digit => {
      const digitSpan = document.createElement('span');
      digitSpan.textContent = digit;
      clock1TimeElement.appendChild(digitSpan);
    });
  }
  
  if (clock2TimeElement) {
    const clock2TimeString = formatTimeForTimezone(CLOCK_CONFIG.clock2.useLocalTime ? null : CLOCK_CONFIG.clock2.timezone);
    clock2TimeElement.innerHTML = '';
    
    clock2TimeString.split('').forEach(digit => {
      const digitSpan = document.createElement('span');
      digitSpan.textContent = digit;
      clock2TimeElement.appendChild(digitSpan);
    });
  }
  
  // Set timezone labels
  if (clock1LabelElement) {
    clock1LabelElement.textContent = CLOCK_CONFIG.clock1.label;
  }
  
  if (clock2LabelElement) {
    clock2LabelElement.textContent = CLOCK_CONFIG.clock2.label;
  }
  
  // Set initial states for date elements
  if (dateElement) {
    dateElement.style.transition = 'none';
    dateElement.style.opacity = '0';
    dateElement.style.transform = 'translateY(20px)';
  }
  
  if (weekdayElement) {
    weekdayElement.style.transition = 'none';
    weekdayElement.style.opacity = '0';
    weekdayElement.style.transform = 'translateY(15px)';
  }
  
  if (weekNumberElement) {
    weekNumberElement.style.transition = 'none';
    weekNumberElement.style.opacity = '0';
  }
  
  if (weatherContainer) {
    weatherContainer.style.transition = 'none';
    weatherContainer.style.opacity = '0';
    weatherContainer.style.transform = 'translateY(20px)';
    weatherContainer.style.visibility = 'visible';
  }
  
  // Force browser reflow
  document.body.offsetHeight;
  
  // Start animations with updated timing
  requestAnimationFrame(() => {
    // 1. Animate both dial rings
    if (dialRing1) {
      dialRing1.style.transition = 'transform 1.8s ease-out';
      dialRing1.style.transform = `rotate(${rotationAngle1 + 360}deg)`;
    }
    
    if (dialRing2) {
      dialRing2.style.transition = 'transform 1.8s ease-out';
      dialRing2.style.transform = `rotate(${rotationAngle2 + 360}deg)`;
    }
    
    // 2. Fade in and rotate active icons for both dials
    const activeIcon1 = isDay1 ? sunIcon1 : moonIcon1;
    const activeIcon2 = isDay2 ? sunIcon2 : moonIcon2;
    
    if (activeIcon1) {
      activeIcon1.style.transition = 'opacity 1s ease, transform 1.2s ease';
      activeIcon1.style.opacity = '1';
      activeIcon1.style.transform = 'rotate(0deg)';
    }
    
    if (activeIcon2) {
      activeIcon2.style.transition = 'opacity 1s ease, transform 1.2s ease';
      activeIcon2.style.opacity = '1';
      activeIcon2.style.transform = 'rotate(0deg)';
    }
    
    // 4. Animate date elements - starts immediately with 120ms stagger
    if (dateElement) {
      dateElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      dateElement.style.opacity = '1';
      dateElement.style.transform = 'translateY(0)';
    }
    
    setTimeout(() => {
      if (weekdayElement) {
        weekdayElement.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        weekdayElement.style.opacity = '1';
        weekdayElement.style.transform = 'translateY(0)';
      }
    }, 120);
    
    setTimeout(() => {
      if (weekNumberElement) {
        weekNumberElement.style.transition = 'opacity 0.8s ease';
        weekNumberElement.style.opacity = '1';
      }
    }, 240);
    
    // 5. Weather elements - starts immediately
    if (weatherContainer) {
      weatherContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      weatherContainer.style.opacity = '1';
      weatherContainer.style.transform = 'translateY(0)';
    }
    
    // 6. Animate both marker dots - delayed start after 1200ms
    setTimeout(() => {
      if (dialMarker1) {
        dialMarker1.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        dialMarker1.style.opacity = '1';
        dialMarker1.style.transform = 'translate(-50%, -50%) scale(1)';
      }
      
      if (dialMarker2) {
        dialMarker2.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        dialMarker2.style.opacity = '1';
        dialMarker2.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 1200);
  });
  
  // Mark animation as complete after all animations have finished
  setTimeout(() => {
    initialAnimationComplete = true;
  }, 2000);
}

// Initialize the page
function init() {
  // Create link sections and setup search input first
  createLinkSections();
  setupSearchInput();
  
  // Immediately update clocks
  updateClock();
  setInterval(updateClock, 1000);
  
  // Setup weather with cached data first
  setupWeather();
  
  // Perform entrance animations last, based on available data
  performEntranceAnimations();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', init);