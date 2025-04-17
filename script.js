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
    name: "Work",
    links: [
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { name: "Kivra", url: "https://kivra.com", icon: "credit-card" },
      { name: "Nordea", url: "https://nordea.com", icon: "bank" },
      { name: "Avanza", url: "https://avanza.se", icon: "trending-up" }
    ]
  },
  {
    name: "Fun",
    links: [
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "Reddit", url: "https://reddit.com", icon: "message-circle" },
      { name: "Wallhaven", url: "https://wallhaven.cc", icon: "image" }
    ]
  },
  {
    name: "AI",
    links: [
      { name: "ChatGPT", url: "https://chat.openai.com", icon: "message-square" },
      { name: "v0", url: "https://v0.dev", icon: "bot" },
      { name: "Google Studio", url: "https://studio.google.com", icon: "brain-circuit" }
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

// Hidden tracker section
const hiddenCategories = [
  {
    name: "Trackers",
    links: [
      { name: "RuTracker", url: "https://rutracker.org/forum/index.php", icon: "database" },
      { name: "1337x", url: "https://x1337x.eu/", icon: "download-cloud" },
      { name: "Fitgirl", url: "https://fitgirl-repacks.site", icon: "download" }
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
  linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>`,
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
  database: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  "eye-off": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" y1="2" x2="22" y2="22"></line></svg>`,
  "chevron-right": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`,
  "download-cloud": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m8 17 4 4 4-4"></path></svg>`,
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

// DOM elements
const timeElement = document.querySelector('.time');
const dateElement = document.querySelector('.date');
const weekdayElement = document.querySelector('.weekday');
const weekNumberElement = document.querySelector('.week-number');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const dialRing = document.querySelector('.dial-ring');
const dialMarker = document.querySelector('.dial-marker');
const linksContainer = document.querySelector('.links-container');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');
let hiddenSectionContainer = null;
let toggleHiddenSectionButton = null;

// Animation state
let initialAnimationComplete = false;

// Weather elements
const weatherContainer = document.querySelector('.weather-container');
const weatherIcon = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const feelsLikeElement = document.getElementById('feelsLike');
const weatherConditionElement = document.getElementById('weatherCondition');
const locationElement = document.getElementById('location');
const sunriseElement = document.getElementById('sunrise');
const sunsetElement = document.getElementById('sunset');

// Weather configuration
const WEATHER_CONFIG = {
  apiKey: "bd94f199d3a62747c068b5f09da9bfd8",
  lat: 59.3194903,  // Default coordinates (Stockholm)
  lon: 18.075060000000007,
  units: "metric",
  cacheTimeMs: 30 * 60 * 1000, // Cache weather data for 30 minutes
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

// Initialize and Update Clock
function updateClock() {
  const now = new Date();
  const timeString = formatTime(now);
  const dateString = formatDate(now);
  const weekdayString = getWeekday(now);
  const weekNumber = getWeekNumber(now);

  // Update display with smooth transitions
  updateTimeWithTransition(timeString);

  if (dateElement.textContent !== dateString) {
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

  if (weekdayElement.textContent !== weekdayString) {
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

  weekNumberElement.textContent = `Week ${weekNumber}`;

  // Update day/night dial
  updateDayNightDial(now);
}

// Update time with smooth digit transitions
function updateTimeWithTransition(newTimeString) {
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

// Day/Night dial updater
function updateDayNightDial(now) {
  // Rotate dial based on current hour
  const rotationAngle = getCurrentHourAngle();
  dialRing.style.transform = `rotate(${rotationAngle}deg)`;

  // Update sun/moon visibility based on time
  const isDay = checkIsDayTime(now);

  // Set proper state for sun/moon icons without transition for initial load
  sunIcon.style.opacity = isDay ? 1 : 0;
  sunIcon.style.transform = isDay ? 'rotate(0deg)' : 'rotate(90deg)';

  moonIcon.style.opacity = isDay ? 0 : 1;
  moonIcon.style.transform = isDay ? 'rotate(90deg)' : 'rotate(0deg)';
}

// Update day/night dial based on sunrise and sunset times
function updateDayNightDialWithSunData(sunrise, sunset) {
  const now = new Date();

  // Check if we have valid sunrise/sunset data
  if (!sunrise || !sunset) {
    // Fallback to the default 6AM-9PM logic if no sun data
    const hours = now.getHours();
    const isDay = hours >= 6 && hours < 21;

    // Calculate position in day/night cycle
    const dayStart = 6;
    const dayEnd = 21;
    const totalDay = dayEnd - dayStart;

    let percentage;
    if (isDay) {
      percentage = (hours - dayStart) / totalDay;
    } else {
      if (hours < dayStart) {
        // Before 6AM
        const totalNight = 24 - totalDay;
        percentage = 0.5 + (hours / (totalNight * 2));
      } else {
        // After 9PM
        const totalNight = 24 - totalDay;
        const hoursAfterSunset = hours - dayEnd;
        percentage = 0.5 + (hoursAfterSunset / (totalNight * 2));
      }
    }

    // Keep percentage between 0 and 1
    percentage = Math.min(Math.max(percentage, 0), 1);

    // Convert to degrees (0-360)
    const rotationAngle = percentage * 360;

    // Update the dial
    if (dialRing) {
      dialRing.style.transform = `rotate(${rotationAngle}deg)`;
    }

    // Update sun/moon visibility
    if (sunIcon) {
      sunIcon.style.opacity = isDay ? 1 : 0;
      sunIcon.style.transform = isDay ? 'rotate(0deg)' : 'rotate(90deg)';
    }

    if (moonIcon) {
      moonIcon.style.opacity = isDay ? 0 : 1;
      moonIcon.style.transform = isDay ? 'rotate(90deg)' : 'rotate(0deg)';
    }

    return;
  }

  // Use actual sunrise/sunset data when available
  const isDay = now >= sunrise && now < sunset;

  // Calculate position in day/night cycle
  let percentage;

  if (isDay) {
    // It's daytime - calculate how far through the day we are
    const dayLength = sunset - sunrise;
    const timeElapsed = now - sunrise;
    percentage = timeElapsed / dayLength;
  } else {
    // It's nighttime
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
  const rotationAngle = percentage * 360;

  // Update the dial
  if (dialRing) {
    dialRing.style.transform = `rotate(${rotationAngle}deg)`;
  }

  // Update sun/moon visibility
  if (sunIcon) {
    sunIcon.style.opacity = isDay ? 1 : 0;
    sunIcon.style.transform = isDay ? 'rotate(0deg)' : 'rotate(90deg)';
  }

  if (moonIcon) {
    moonIcon.style.opacity = isDay ? 0 : 1;
    moonIcon.style.transform = isDay ? 'rotate(90deg)' : 'rotate(0deg)';
  }
}

// Create link sections
function createLinkSections() {
  // Create regular link sections first
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
  
  // Create hidden section wrapper
  createHiddenSection();
}

// Create hidden section with toggle button
function createHiddenSection() {
  // Create container for hidden sections
  hiddenSectionContainer = document.createElement('div');
  hiddenSectionContainer.className = 'hidden-section';
  
  // Create toggle button
  toggleHiddenSectionButton = document.createElement('button');
  toggleHiddenSectionButton.className = 'toggle-hidden-section';
  toggleHiddenSectionButton.setAttribute('aria-label', 'Toggle hidden section');
  toggleHiddenSectionButton.innerHTML = icons['chevron-right'];
  
  // Create the hidden section content
  hiddenCategories.forEach(category => {
    const section = document.createElement('div');
    section.className = 'link-section';
    
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
    hiddenSectionContainer.appendChild(section);
  });
  
  // Create a wrapper div to contain both the button and hidden section
  const hiddenSectionWrapper = document.createElement('div');
  hiddenSectionWrapper.className = 'hidden-section-wrapper';
  
  // Add the toggle button and hidden section to the wrapper
  hiddenSectionWrapper.appendChild(hiddenSectionContainer);
  hiddenSectionWrapper.appendChild(toggleHiddenSectionButton);
  
  // Add wrapper directly to the links container in the same row as other sections
  linksContainer.appendChild(hiddenSectionWrapper);
  
  // Set up toggle functionality
  setupHiddenSectionToggle();
}

// Setup toggle functionality for hidden section
function setupHiddenSectionToggle() {
  // Check if toggle preference exists in localStorage
  const isVisible = localStorage.getItem('hiddenSectionVisible') === 'true';
  
  // Set initial state
  if (isVisible) {
    hiddenSectionContainer.classList.add('visible');
    toggleHiddenSectionButton.classList.add('visible');
  }
  
  // Add click event listener
  toggleHiddenSectionButton.addEventListener('click', () => {
    const isCurrentlyVisible = hiddenSectionContainer.classList.contains('visible');
    
    if (isCurrentlyVisible) {
      hiddenSectionContainer.classList.remove('visible');
      toggleHiddenSectionButton.classList.remove('visible');
      localStorage.setItem('hiddenSectionVisible', 'false');
    } else {
      hiddenSectionContainer.classList.add('visible');
      toggleHiddenSectionButton.classList.add('visible');
      localStorage.setItem('hiddenSectionVisible', 'true');
    }
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

// Weather functions
function setupWeather() {
  // Don't hide weather container here since we'll handle it in the animations
  
  if (WEATHER_CONFIG.useGeolocation) {
    getUserLocation()
      .then(coords => {
        // Update coordinates with user's location
        WEATHER_CONFIG.lat = coords.latitude;
        WEATHER_CONFIG.lon = coords.longitude;
        fetchWeatherData();
      })
      .catch(error => {
        console.warn('Geolocation error, using default coordinates:', error);
        fetchWeatherData(); // Fallback to default coordinates
      });
  } else {
    fetchWeatherData();
  }

  // Add event listener to weather icon for manual refresh
  if (weatherIcon) {
    weatherIcon.addEventListener('click', () => {
      // Don't get new location on manual refresh - use existing coordinates
      fetchWeatherData(true); // Force refresh with existing coordinates
    });
  }
}

// Function to get user's geolocation
function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
      },
      error => {
        reject(error);
      },
      {
        enableHighAccuracy: false, // Don't need high accuracy for weather
        timeout: 5000, // 5 seconds timeout
        maximumAge: 600000 // Cache location for 10 minutes
      }
    );
  });
}

function fetchWeatherData(forceRefresh = false) {
  // Check if we have cached data
  const cachedWeatherData = forceRefresh ? null : getCachedWeatherData();
  if (cachedWeatherData) {
    displayWeatherData(cachedWeatherData);
    return;
  }

  // Show loading state
  if (weatherIcon) {
    weatherIcon.innerHTML = `<div class="weather-loader"></div>`;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${WEATHER_CONFIG.lat}&lon=${WEATHER_CONFIG.lon}&units=${WEATHER_CONFIG.units}&appid=${WEATHER_CONFIG.apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Save to cache and display
      cacheWeatherData(data);
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      displayWeatherError();
    });
}

function displayWeatherData(data) {
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

    // Update UI
    if (weatherIcon) weatherIcon.innerHTML = icons[iconName];
    if (temperatureElement) temperatureElement.textContent = `${temperature}°`;
    if (feelsLikeElement) feelsLikeElement.textContent = `Feels: ${feelsLike}°`;
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
    } else if (weatherContainer) {
      // If this is a refresh after initial load, add the update animation
      weatherContainer.classList.add('weather-updated');
      setTimeout(() => {
        weatherContainer.classList.remove('weather-updated');
      }, 1000);
    }

    // Update day/night dial based on sunrise/sunset if available
    updateDayNightDialWithSunData(sunrise, sunset);
  } catch (error) {
    console.error('Error parsing weather data:', error);
    displayWeatherError();
  }
}

function displayWeatherError() {
  if (weatherIcon) weatherIcon.innerHTML = icons['cloud'];
  if (temperatureElement) temperatureElement.textContent = '--°';
  if (feelsLikeElement) feelsLikeElement.textContent = 'Feels: --°';
  if (weatherConditionElement) weatherConditionElement.textContent = 'Weather Unavailable';
  if (locationElement) locationElement.textContent = 'Try again later';
  if (sunriseElement) {
    const sunriseContent = sunriseElement.innerHTML.split('</svg>')[0] + '</svg>--:--';
    sunriseElement.innerHTML = sunriseContent;
  }
  if (sunsetElement) {
    const sunsetContent = sunsetElement.innerHTML.split('</svg>')[0] + '</svg>--:--';
    sunsetElement.innerHTML = sunsetContent;
  }
}

function cacheWeatherData(data) {
  try {
    const cachedItem = {
      data: data,
      timestamp: Date.now()
    };
    localStorage.setItem('weatherCache', JSON.stringify(cachedItem));
  } catch (error) {
    console.error('Error caching weather data:', error);
  }
}

function getCachedWeatherData() {
  try {
    const cachedItem = localStorage.getItem('weatherCache');
    if (!cachedItem) return null;

    const { data, timestamp } = JSON.parse(cachedItem);
    const now = Date.now();

    // Check if cache is still valid
    if (now - timestamp < WEATHER_CONFIG.cacheTimeMs) {
      return data;
    }

    return null;
  } catch (error) {
    console.error('Error getting cached weather data:', error);
    return null;
  }
}

// Clean and focused entrance animations
function performEntranceAnimations() {
  const now = new Date();
  const isDay = checkIsDayTime(now);
  const rotationAngle = getCurrentHourAngle();
  
  // Set initial states
  if (dialRing) {
    dialRing.style.transition = 'none';
    dialRing.style.transform = 'rotate(0deg)';
  }
  
  if (dialMarker) {
    dialMarker.style.transition = 'none';
    dialMarker.style.opacity = '0';
    dialMarker.style.transform = 'translate(-50%, -50%) scale(0)';
  }
  
  if (sunIcon) {
    sunIcon.style.transition = 'none';
    sunIcon.style.opacity = '0';
    sunIcon.style.transform = `rotate(${isDay ? -120 : 0}deg)`;
  }
  
  if (moonIcon) {
    moonIcon.style.transition = 'none';
    moonIcon.style.opacity = '0';
    moonIcon.style.transform = `rotate(${isDay ? 0 : 120}deg)`;
  }
  
  // Set initial state for time display
  if (timeElement) {
    const timeString = formatTime(now);
    timeElement.innerHTML = ''; // Clear any existing content
    
    // Create digits with visibility immediately (no animation)
    timeString.split('').forEach(digit => {
      const digitSpan = document.createElement('span');
      digitSpan.textContent = digit;
      // No initial transforms or opacity changes - show immediately
      timeElement.appendChild(digitSpan);
    });
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
    weatherContainer.style.visibility = 'visible'; // Make sure it's visible for animation
  }
  
  // Force browser reflow
  document.body.offsetHeight;
  
  // Start animations with updated timing
  requestAnimationFrame(() => {
    // 1. Animate the dial ring - starts immediately, duration 1.8s
    if (dialRing) {
      dialRing.style.transition = 'transform 1.8s ease-out';
      dialRing.style.transform = `rotate(${rotationAngle + 360}deg)`;
    }
    
    // 2. Fade in and rotate the active icon - starts immediately, duration 1.0-1.2s
    const activeIcon = isDay ? sunIcon : moonIcon;
    if (activeIcon) {
      activeIcon.style.transition = 'opacity 1s ease, transform 1.2s ease';
      activeIcon.style.opacity = '1';
      activeIcon.style.transform = 'rotate(0deg)';
    }
    
    // No animation for clock digits - they're already visible
    
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
    }, 120); // 120ms stagger
    
    setTimeout(() => {
      if (weekNumberElement) {
        weekNumberElement.style.transition = 'opacity 0.8s ease';
        weekNumberElement.style.opacity = '1';
      }
    }, 240); // 120ms stagger after weekday (2 x 120ms)
    
    // 5. Weather elements - starts immediately
    if (weatherContainer) {
      weatherContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      weatherContainer.style.opacity = '1';
      weatherContainer.style.transform = 'translateY(0)';
    }
    
    // 6. Animate the marker dot - delayed start after 1200ms
    setTimeout(() => {
      if (dialMarker) {
        dialMarker.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        dialMarker.style.opacity = '1';
        dialMarker.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    }, 1200);
  });
  
  // Mark animation as complete after all animations have finished
  // Using the longest duration (dial + marker dot) to ensure all animations are done
  setTimeout(() => {
    initialAnimationComplete = true;
  }, 2000);
}

// Initialize the page
function init() {
  // Create link sections and setup search input first
  createLinkSections();
  setupSearchInput();
  
  // Perform entrance animations
  performEntranceAnimations();
  
  // Setup weather
  setupWeather();
  
  // Set up clock updates after animations begin
  setTimeout(() => {
    updateClock();
    setInterval(updateClock, 1000);
  }, 100);
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', init);