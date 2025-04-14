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
      { name: "Wallhaven", url: "https://wallhaven.cc", icon: "image" },
      { name: "Fitgirl", url: "https://fitgirl-repacks.site", icon: "download" }
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
const linksContainer = document.querySelector('.links-container');

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
    
    setTimeout(() => {
      dateElement.textContent = dateString;
      dateElement.style.opacity = 1;
      dateElement.style.transform = 'translateY(0)';
    }, 300);
  }
  
  if (weekdayElement.textContent !== weekdayString) {
    weekdayElement.style.opacity = 0;
    weekdayElement.style.transform = 'translateY(8px)';
    
    setTimeout(() => {
      weekdayElement.textContent = weekdayString;
      weekdayElement.style.opacity = 1;
      weekdayElement.style.transform = 'translateY(0)';
    }, 300);
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
      
      setTimeout(() => {
        digitSpan.style.opacity = 1;
        digitSpan.style.transform = 'translateY(0)';
      }, 10);
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
  
  sunIcon.style.opacity = isDay ? 1 : 0;
  sunIcon.style.transform = isDay ? 'rotate(0deg)' : 'rotate(90deg)';
  
  moonIcon.style.opacity = isDay ? 0 : 1;
  moonIcon.style.transform = isDay ? 'rotate(90deg)' : 'rotate(0deg)';
}

// Create link sections
function createLinkSections() {
  categories.forEach(category => {
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
    linksContainer.appendChild(section);
  });
}

// Initialize the page
function init() {
  // Initial clock update
  updateClock();
  
  // Set up clock interval - update every second
  setInterval(updateClock, 1000);
  
  // Create link sections
  createLinkSections();
}

// Run initialization when page loads
document.addEventListener('DOMContentLoaded', init);